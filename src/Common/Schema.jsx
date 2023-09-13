import * as Yup from "yup";
export const schema = Yup.object({
  FirstName: Yup.string().min(2).max(20).required("Enter your name"),
  LastName: Yup.string().min(2).max(20).required("Enter your  last name"),
  
 
 
});