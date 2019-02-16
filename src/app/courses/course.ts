import { ICourseDetail } from './courseDetail';

export interface ICourse{

    CourseId:number;
    Name:string;
    Description:string;
    CourseDetailDto:ICourseDetail[];
   
   
}

export interface CourseListResolved{
    courses:ICourse[];
    error?:any;
}