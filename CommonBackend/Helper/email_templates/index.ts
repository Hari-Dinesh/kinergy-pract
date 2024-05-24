function caseNotifyAdmin(name, case_name, client_name, provider_name, time_period, message = "") {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<body>

<p>Dear ${name},
<br><br>
I am writing to request your assistance in reviewing the Medical Record ${case_name} of ${client_name}. As you may be aware, ${client_name} has been under our care for the past ${time_period} days and I believe your inputs would be greatly valuable in ensuring that their needs are being met.
<br><br>
I would greatly appreciate it if you could take a look at ${client_name}'s records and provide me with your insights and recommendations. If there is anything that requires further action or attention, please let me know and I will do my best to address it promptly.

${message.length > 0 ? 
    `<br><br> Additionally, I have included some comments on the issue that I believe may be helpful in resolving it. Please see my comments below:
     <br><br> ${message}` : ""}
<br>
Thank you for your time. I look forward to hearing back from you soon.
<br>
Best regards,<br>
${provider_name}
</p>
</body>
</html>`
}

function interventionNotifyAdmin(name, case_name, client_name, provider_name, time_period, message = "") {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<body>

<p>Dear ${name},
<br><br>
I am writing to request your assistance in reviewing the Medical Record ${case_name} of ${client_name}. As you may be aware, ${client_name} has been under our care for the past ${time_period} days and I believe your inputs would be greatly valuable in ensuring that their needs are being met.
<br><br>
I would greatly appreciate it if you could take a look at ${client_name}'s SOAP Note and provide me with your insights and recommendations. 

${message.length > 0 ? 
    `<br><br> Additionally, I have included some comments on the issue that I believe may be helpful in resolving it. Please see my comments below:
     <br><br> ${message}` : ""}
<br>
Thank you for your time. I look forward to hearing back from you soon.
<br>
Best regards,<br>
${provider_name}
</p>
</body>
</html>`

}

function clientRegistration(client_name: any,url: any) {

    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<body>

<p>Dear ${client_name},
<br><br>
We are excited to have you onboarded with Zoella. As part of our commitment to providing the best care possible, we request that you fill out our Client Registration Portal. These questionnaires are vital in helping us understand your particular needs and medical history, allowing us to deliver individualised care.
<br><br>
You can access the Client Registration Portal by clicking the link: <a href=${url}>Registration Portal</a> 
<br><br>
Please take some time to fill out these forms at your earliest convenience. If you have any questions or concerns, please do not hesitate to reach out to us. We are here to help you.
<br><br>
Thank you for choosing Zoella. We look forward to helping you on your journey to wellness.
<br><br>
Best regards,<br>
Kinergy
</p>
</body>
</html>`
}

function onboardedClient(client_name,url) {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<body>

<p>Dear ${client_name},
<br><br>
We are excited to welcome you to Zoella! Your onboarding process has been successfully completed, and we're thrilled to have you on board. With our platform, you can easily manage your medical information and access personalized services to enhance your healthcare experience.
<br><br>
To get started, please visit your personalized portal by clicking on the following link: <a href=${url}>Customer Portal</a>

<br><br>
We are committed to safeguarding your privacy and maintaining the confidentiality of your data. Our platform utilizes state-of-the-art security measures to ensure the protection of your personal information at all times.
<br><br>
Thank you for choosing Zoella. Once again, welcome to our web application! If you have any questions or concerns, please do not hesitate to reach out to us. We look forward to serving you and providing you with a seamless and personalized healthcare experience.
<br><br>
Best regards,<br>
Kinergy
</p>
</body>
</html>`
}

function providerRegistration(provider_name,url) {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<body>

<p>Dear ${provider_name},
<br><br>
We are delighted to inform you that you have been added as a provider to our web application by your admin. This is an exciting opportunity for you to offer your services and efficiently manage your clients through our platform.
<br><br>
To complete your onboarding process, please follow the steps below:
<br><br>
<b>Step 1: Access the Admin Portal</b>
<br><br>
Click on the following link to access the Admin portal: <a href=${url}>Admin Portal</a>
<br><br>
<b>Step 2: Set Up Your Account </b>
<br><br>
Once you open the link, you will be guided through the process of setting up your account. Please provide the required information, including your basic details, about yourself, contact information, address information, emergency contact information professional details and education details. You will also need to set a password to secure your account.
<br><br>
Password: 12345678
<br>Note: Please note that the dummy password provided above is temporary.
<br><br>
<b>Step 3: Explore Your Dashboard</b>
<br><br>
After completing the onboarding process, you will be redirected to your personalized dashboard. From there, you can manage your clients, view appointments, access client records, and utilize various tools and features to streamline your workflow.
<br><br>
If you encounter any issues during the onboarding process or have any questions, please don't hesitate to contact our support team at kinergy@gmail.com. We're here to assist you and ensure a smooth transition onto our platform.
<br><br>
Thank you for joining our team. We look forward to working together and providing exceptional care to our clients.
<br><br>
Best regards,<br>
Kinergy
</p>
</body>
</html>`
}

function userRegistration(provider_name, url, business_email_address, admin_email, admin_phone_no) {
    return `<!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    <style>
        li{
            margin-left: 30px;
        }
        .footer{
        display : flex;
        gap: 30px;
        
        }
    </style>
    </head>
    <body>
    <p>Hi ${provider_name},</p>
    <br/>
    <p>Welcome to <b>Kinergy Sports Medicine and Performance!</b></p>
    <br/>
    <p>I am excited to welcome you to our team, and I look forward to working together to make a difference in our community. At Kinergy, we pride ourselves in the level of service we provide all our clients, and I have confidence that you will be a positive contributor to our team!</p>
    <br/>
    <p>As part of our onboarding process, you have been added as a staff member to our web platform, <b>Zoella.Health.</b> In the next day or so, I ask that you please complete your onboarding into the Zoella platform.</p>
    <br/>
    <p>To complete your onboarding process, please follow the steps below:</p>
    <br/>
    
    <p><b><u>Step 1</u>: Access the Admin Portal</b></p>
    Click on the following link to access the Admin portal: <a href=${url}>Admin Portal</a>
    <br/>
    <p><b><u>Step 2</u>: Log into the account</b></p>
    
    <p>Once you click on the link, use the following information to log into your account:</p>
    &emsp; <b><u>Email</u>:</b> Please use the email address that this email was sent to. <br/>
    &emsp; <b><u>Temporary Password</u></b>: 12345678
    <br/>
    <p><b><u>Step 3</u>: Set Up your account</b></p>
    
    <p>Once logged in, please go to the “Settings” section, and follow these instructions:</p>
    &emsp; 1) Update your Personal Details:
    <ol type="a">
        <li> Select the “Edit” button next to “Basic Details.”</li>
        <li>  Please enter all necessary information, including your personal details, details about yourself, contact information, address information, emergency contact information, professional experience details, and education details.</li>
        
    </ol>
    
    &emsp; 2) Update your Password in Account Details:
    <ol type="a">
    
        <li> Select the “Edit” button next to “Password.”</li>
        <li> Please follow the instructions to select a new password.</li>
    </ol>
    
    <p><b><u>Step 4</u>: Explore your Dashboard</b></p>
    <p>After completing the onboarding process, you will be redirected to your personalized dashboard. From there, you can manage your clients, view appointments, access client records, and utilize various tools and features to streamline your workflow.</p>
    
    <p>If you encounter any issues during the onboarding process or have any questions, please don't hesitate to contact our support team at <a href="mailto:${business_email_address}">business email address</a>. We are here to assist you to ensure a smooth transition into our team.</p>
    <br/>
    <p>Once again, welcome to the Kinergy family! I look forward to working together to provide exceptional care to our clients.</p>
    
    Best regards,
    
    <div class="footer">
    <img src="cid:kinergyLogo" alt="Logo" style="width: 86px; height: 46px; margin-right: 5px;" class="logo"/>
    
    <div>
    <b>TERRILL LOBO </b>CAT(C),LAT,ATC,BPE-AT,CPS <br/>
    Owner, Kinergy Sports Medicine and Performance <br/>
    Athletic Therapist / Athletic Trainer <br/>
    Cell: ${admin_phone_no} <br/>
    Email: <a href="mailto:${admin_email}">${admin_email}</a>
    
    </div>
    
    </div>
    
    </body>
    </html>
    
    
    `;

}

function clientBirthday(client_name) {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<body>

<p>Dear ${client_name},
<br><br>
Birthdays are special moments that allow us to celebrate the incredible individuals like yourself who bring joy and positivity to our lives. As a token of our appreciation, we have created a personalized email just for you. On behalf of the entire Zoella team, we want to extend our heartfelt birthday greetings to you! 🎉🎂✨
<br><br>
From all of us at Zoella, we want to express our deepest gratitude for choosing us as your trusted partner on your wellness journey. It is an honor to serve you and contribute to your overall well-being. Enjoy your special day to the fullest, surrounded by loved ones and cherished memories.
<br><br>
May this day and the year ahead be filled with countless blessings and remarkable achievements.
<br><br>
Warmest wishes,<br>
Kinergy
</p>
</body>
</html>`
}

function rescheduleRequest(client_name, facility_number, client_portal) {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<body>

<p>Dear ${client_name},
<br><br>
We regret to inform you that your appointment with the provider you had booked is being rescheduled due to their unavailability. We apologize for any inconvenience caused. However, we have made it convenient for you to manage your appointment directly.
<br><br>
If you prefer to speak with our customer support representative to reschedule, please call us at ${facility_number}. For your convenience, you can also log in to your client portal at ${client_portal} to reschedule your appointment. Simply follow the instructions provided to make the necessary changes.
<br><br>
We understand that flexibility is crucial, and we appreciate your cooperation in rescheduling as needed. If you have any questions or require assistance, our customer support team is ready to help.
<br><br>
We apologize once again for any inconvenience caused and thank you for choosing our services.
<br><br>
Best regards,<br>
Kinergy
</p>
</body>
</html>`
}

function reportIssue(issue) {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<body>

<p>Dear Admin,
<br><br>
This is to inform you that a user has reported an issue while using Zoella application. The details of the issue are as follows:
<br><br>
${issue}
<br><br>
Thank you for your attention to this matter.
</p>
</body>
</html>`
}

function forgotPasswordOTP(user_name, code, business_email, admin_phone_no, admin_email) {
    return `<!DOCTYPE html>
    <html>
    <style>
        h1 {
            display: flex;
            justify-content: center; /* corrected value */
        }
        .imgContainer{
            display : flex;
            justify-content: center;
        }
        p{
            font-size: 20px;
        }
                .footer{
            display : flex;
            gap: 30px;
            
            }
    </style>
    <body>
    
    <h1>Forgot your password? It happens to the best of us.</h1>
    <div class="imgContainer">
    <img src="cid:forgetPasswordLock" alt="lock image"/>
    </div>
    
    <p>Please use the following OTP code to reset your password: ${code}</p>
    <p><i>Note: This code is only valid for 5 minutes. </i></p>
    
    <p>If you do not want to change your password or didn't request a reset, you can ignore and delete this email. However, we recommend you report the issue to the management team: ${business_email}</p>
     <div class="footer">
        <img src="cid:kinergyLogo" alt="Logo" style="width: 86px; height: 46px; margin-right: 5px;" class="logo"/>
        
        <div>
        <b>TERRILL LOBO </b>CAT(C),LAT,ATC,BPE-AT,CPS <br/>
        Owner, Kinergy Sports Medicine and Performance <br/>
        Athletic Therapist / Athletic Trainer <br/>
        Cell: ${admin_phone_no} <br/>
        Email: <a href="mailto:${admin_email}">${admin_email}</a>
        
        </div>
        
        </div>
    </body>
    </html>
    `
}




export {
    caseNotifyAdmin,
    interventionNotifyAdmin,
    clientRegistration,
    onboardedClient,
    reportIssue,
    clientBirthday,
    providerRegistration,
    userRegistration,
    rescheduleRequest,
    forgotPasswordOTP,
}