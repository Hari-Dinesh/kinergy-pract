import _ from "lodash"
const moment = require("moment");
const momentTz = require("moment-timezone");
import { ObjectId } from "mongodb";

const CleanResponse = (res) => {
    for (const key in res) {
        if (res[key] === '') {
            delete res[key];
        }
    }
    return res;
}

const PadWithZero = (num, targetLength) => {
    return String(num).padStart(targetLength, '0');
}

const ActivityLogKeyMapping = {
    "first_name": "First Name",
    "last_name": "Last Name",
    "alias_first_name" : "Alias First Name",
    "alias_last_name" : "Alias Last Name",
    "gender": "Gender",
    "dob": "Date of Birth",
    "nick_name": "Nickname/Preferred Name",
    "ssn": "SSN",
    "primary_email": "Primary Email",
    "secondary_emails": "Email",
    "address": "Address",
    "address.address_line" : "Address Line",
    "address.city" : "City",
    "address.state" : "State",
    "address.zip" : "Zip",
    "address.country" : "Country",
    "primary_contact_info": "Primary Contact Information",
    "secondary_contact_info": "Contact Information",

    "emergency_contact_info": "Emergency Contact Information",
    "emergency_contact_info.primary_emergency.name" : "Name",
    "emergency_contact_info.primary_emergency.relationship" : "Relationship",
    "emergency_contact_info.primary_emergency.language" : "Language",
    "emergency_contact_info.primary_emergency.primary_contact_info" : "Primary Contact Information",
    "emergency_contact_info.primary_emergency.secondary_contact_info" : "Secondary Contact Information",

    "emergency_contact_info.secondary_emergency.name" : "Name",
    "emergency_contact_info.secondary_emergency.relationship" : "Relationship",
    "emergency_contact_info.secondary_emergency.language" : "Language",
    "emergency_contact_info.secondary_emergency.primary_contact_info" : "Primary Contact Information",
    "emergency_contact_info.secondary_emergency.secondary_contact_info" : "Secondary Contact Information",
    
    
    "work_info": "Work Information",


    "personal_habits": "Personal Habits",
    "allergies": "Allergies",
    "medications": "Medications/Supplements",
    "medical_history": "Medical History",
    "females_only_questions": "Females Only",
    "surgical_history": "Surgical History",
    "musculoskeletal_history": "Musculoskeletal History",
    "medical_provider_info": "Medical Provider Information",

    "communication_preferences": "Communication Preferences",
    "referral_details": "Referral Details",
    "is_active" : "Is Active",
    "is_deleted" : "Is Deleted",
    "is_dependent" : "Dependent Client",
    "Linked_by" : "Linked To Client"

}

const getDaysSince = (date1, date2) => {
    const currentDateInMs = date1.getTime();
    const targetDateInMs = date2.getTime();

    const diffInMs = currentDateInMs - targetDateInMs;

    return diffInMs / 1000 / 60 / 60 / 24;
}

const getHoursSince = (date1, date2) => {

    date1 = new Date(date1);
    date2 = new Date(date2);
    const currentDateInMs = date1.getTime();
    const targetDateInMs = date2.getTime();

    const diffInMs = currentDateInMs - targetDateInMs;

    return diffInMs / 3600000;
}

const getMinSince = (date1, date2) => {
    const currentDateInMs = date1.getTime();
    const targetDateInMs = date2.getTime();

    const diffInMs = currentDateInMs - targetDateInMs;

    return diffInMs / 60000;
}

const minToHour = (time) => {
    let hours = (time / 60);
    let round_hours = Math.floor(hours);
    let minutes = (hours - round_hours) * 60;
    let round_minutes = Math.round(minutes);
    let format_minutes = round_minutes.toString()
    if (round_minutes < 10) {
        format_minutes = "0" + round_minutes
    }
    return round_hours + ":" + format_minutes
}

const getDateString = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", {month: "short"});
    const year = date.getFullYear();
    const formatted_date = `${day}-${month}-${year}`;

    return formatted_date
}

// const getDateTimeString = (timestamp: any) => {
//     const date = new Date(timestamp);
//     const day = date.getDate();
//     const month = date.toLocaleString("default", {month: "short"});
//     const year = date.getFullYear();
//     const hours = date.getHours() % 12 || 12;
//     const minutes = date.getMinutes();
//     const ampm = date.getHours() >= 12 ? "PM" : "AM";

//     const formatted_date = `${day}-${month}-${year}`;
//     const formatted_time = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

//     return `${formatted_date} | ${formatted_time}`;
// }
const getDateTimeString = (utcTimestamp: any, timezone = "Asia/Calcutta", format = "DD-MM-YYYY | hh:mm A") => {
    const localTime = moment.utc(utcTimestamp).tz(timezone);
    return localTime.format(format);
}


function getDateRange(startDate, endDate) {
    const dateRange = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
        let new_date = new Date(currentDate)
        dateRange.push(new_date);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateRange;
}

function getSpecificMonthDates(num_of_months, applicable_days) {
    const currentDate = new Date();
    const monthDates = [];

    for (let i = 0; i < num_of_months; i++) {
        let currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        for (let day = 0; day <= 31; day++) {
            const currentDate = new Date(currentYear, currentMonth, day);

            if (applicable_days.includes(currentDate.getDay())) {
                monthDates.push(currentDate.toISOString().slice(0, 10));
            }
        }

        currentDate.setMonth(currentMonth + 1);
    }

    return monthDates;
}
function checkForEmptyData(data) {
    if (
      data === null ||
      data === undefined ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && Object.keys(data).length === 0) ||
      data === '' ||
      (Array.isArray(data) && data.every((item) => isEmptyData(item)))
    ) {
      return null;
    }
    return data;
  }
  
  function isEmptyData(data) {
    return (
      data === null ||
      data === undefined ||
      (Array.isArray(data) && data.length === 0) ||
      (typeof data === 'object' && Object.keys(data).length === 0) ||
      data === '' ||
      (Array.isArray(data) && data.every((item) => isEmptyData(item)))
    );
  }
  
  
  

const getOTPCode = () => {2
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP
}

const getDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", {month: "short"});
    const year = date.getFullYear();
    const formatted_date = `${day}-${month}-${year}`;

    return formatted_date
}

function formatPhoneNumber(phoneNumber : string) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Remove non-numeric characters
  
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
  
    return "NA"; // Invalid phone number format
  }

  function getTimeFromMinutes(TimeInMinutes : number) {
    let timeInMiliseconds = TimeInMinutes * 60 * 1000;
    let date = new Date(timeInMiliseconds);

        // Extract hours and minutes
        let hours = date.getHours();
        let minutes = date.getMinutes();

        let ampm = hours >= 12 ? 'PM' : 'AM';
        //  Convert 24-hour format to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)
        let formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`; // e.g 10:12 PM
        return formattedTime;
  }


  function closeIfOpen(segment: any) {
        if (segment && !segment.isClosed()) {
            segment.close();
        }
  }
  function serializeError(error) {
    if (!(error instanceof Error)) {
        throw new Error('Provided argument is not an instance of Error');
    }

    return {
        name: error.name,
        message: error.message,
        stack: error.stack,

    };
}


function normalizeDataTypes(value : string | number | boolean | object | any[] | null | undefined) {
    // If value is undefined, null, empty string, or array, return it as is
    // if (value === undefined || value === null || value === '' || Array.isArray(value)) {
    //     return value;
    // }

    // // If value is a string representing boolean, convert it to a boolean
    // if (typeof value === 'string' && ["true", "false"].includes(value.toLowerCase())) {
    //     return value === "true";
    // }

    // // If value is a string, check if it's a valid ObjectId or Date
    // if (typeof value === 'string') {
    //     if (ObjectId.isValid(value)) return new ObjectId(value);
    //     // if(moment(value, moment.ISO_8601, true).isValid()){
    //     //     return new Date(value);
    //     // }
    // }

    // // If value is an object, recursively validate its properties
    // if (typeof value === 'object') {
    //     for (let key in value) {
    //         value[key] = normalizeDataTypes(value[key]);
    //     }
    // }

    // // Return the value after validation
    return value;
}

function TrimAndupperCaseFirstLetter(string : string) {
    string = string.trim()
    if (!/^[a-zA-Z]+$/.test(string[0])) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return string;
   
}

const monthMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec"

}

const formatStaticDate = (date : string) =>{
    let dateArr = date.split("-");
    let formattedDate = dateArr[2] + "-" + monthMap[dateArr[1]]+ "-" + dateArr[0];
    return formattedDate;
}

  
  


export {
    CleanResponse,
    PadWithZero,
    _,
    ActivityLogKeyMapping,
    getDaysSince,
    getMinSince,
    getHoursSince,
    minToHour,
    getDateTimeString,
    getDateRange,
    getDate,
    formatPhoneNumber,
    getSpecificMonthDates,
    getDateString,
    checkForEmptyData,
    getOTPCode,
    getTimeFromMinutes,
    closeIfOpen,
    serializeError,
    normalizeDataTypes,
    formatStaticDate,
    TrimAndupperCaseFirstLetter

}