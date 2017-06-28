module.exports= {
  port: process.env.PORT || 8080,
  regTextName : 'regno',
  pwdTextName : 'passwd',
  captchaTextName : 'vrfcd',
  validity : 12*60,
  captchaUri : "http://academicscc.vit.ac.in/student/captcha.asp",
  loginSubmitAction : 'https://academicscc.vit.ac.in/student/stud_login_submit.asp',
  homeHref : "https://academicscc.vit.ac.in/student/home.asp",
  TimeTableHref: 'https://academicscc.vit.ac.in/student/course_regular.asp?sem=WS',
  attendanceHref : ''
}
