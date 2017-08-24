module.exports= {
  port: process.env.PORT || 8080,
  semStart : process.env.semStart || '11-Jul-2017',
  semEnd : process.env.semEnd || '10-Nov-2017',
  regTextName : 'regno',
  pwdTextName : 'passwd',
  captchaTextName : 'vrfcd',
  validity : 5, //IN MINUTES
  moodleBaseUrl : "http://moodlecc.vit.ac.in",
  captchaUri : "https://academicscc.vit.ac.in/student/captcha.asp",
  loginSubmitAction : 'https://academicscc.vit.ac.in/student/stud_login_submit.asp',
  homeHref : "https://academicscc.vit.ac.in/student/home.asp",
  attendanceSubmitHref : 'https://academicscc.vit.ac.in/student/attn_report_details.asp',
  assignmentSubmitHref : 'https://academicscc.vit.ac.in/student/cal_da_process.asp',

  //WITH SEM VARIABLE
  moodleSemCode : 'F17',
  TimeTableHref: 'https://academicscc.vit.ac.in/student/course_regular.asp?sem=FS',
  attendanceHref : 'https://academicscc.vit.ac.in/student/attn_report.asp?sem=FS',
  assignmentsHref : 'https://academicscc.vit.ac.in/student/cal_da.asp?sem=FS',
  examScheduleHref : 'https://academicscc.vit.ac.in/student/cat_student.asp?sem=FS'
}
