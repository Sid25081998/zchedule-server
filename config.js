module.exports= {
  port: process.env.PORT || 8080,
  semStart : process.env.semStart || '04-Jan-2017',
  semEnd : process.env.semEnd || '01-Jul-2017',
  regTextName : 'regno',
  pwdTextName : 'passwd',
  captchaTextName : 'vrfcd',
  validity : 5, //IN MINUTES
  captchaUri : "http://academicscc.vit.ac.in/student/captcha.asp",
  loginSubmitAction : 'https://academicscc.vit.ac.in/student/stud_login_submit.asp',
  homeHref : "https://academicscc.vit.ac.in/student/home.asp",
  attendanceSubmitHref : 'https://academicscc.vit.ac.in/student/attn_report_details.asp',

  //WITH SEM VARIABLE
  TimeTableHref: 'https://academicscc.vit.ac.in/student/course_regular.asp?sem=FS',
  attendanceHref : 'https://academicscc.vit.ac.in/student/attn_report.asp?sem=FS'
}
