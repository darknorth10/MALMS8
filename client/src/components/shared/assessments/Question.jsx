import { Radio } from "@material-tailwind/react";
 
export const Question = ({name, value, opt1, opt2, opt3, opt4, answ, formik}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <Radio name={name} label={`A. ${opt1}`} color="blue" value="a" required onChange={formik.handleChange} />
      <Radio name={name} label={`B. ${opt2}`} color="blue" value="b" onChange={formik.handleChange}/>
      <Radio name={name} label={`C. ${opt3}`} color="blue" value="c" onChange={formik.handleChange}/>
      <Radio name={name} label={`D. ${opt4}`} color="blue" value="d" onChange={formik.handleChange}/>
    </div>
  );
}