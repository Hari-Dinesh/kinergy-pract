import { ObjectId } from "mongoose";
export interface Attachment {
    name: string;
    type: string;
    key: string;
}
 export interface ExerciseLog{
    id:string;
    name:string;
    no_of_steps:string;
    no_of_reps:string;
    time:string;
    resistence:string;
 }

 export interface ExerciseModel{
    medical_record_id: ObjectId,
    intervention_id: ObjectId,
    provider_id: ObjectId
    exercise_records: ExerciseLog[],
    attachments: Attachment[],
    is_exercise_log_added: boolean,
    comments: string,
    created_at: Date;
    updated_at: Date;
 }