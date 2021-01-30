export function getDate() {
  let d = new Date();
  // let year = d.getFullYear();
  // let month = d.getMonth() + 1;
  // let day = d.getDay() + 27;
  // console.log(d.toLocaleDateString());

  //this takes off the extra characters of the ISO date so I can pass
  //it into my url as a parameter

  return d.toLocaleDateString();
  // return "Jan 02 2021";
}
