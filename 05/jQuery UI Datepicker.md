### jQuery UI Datepicker

**references**

- [JqueryUI - Datepicker](http://www.tutorialspoint.com/jqueryui/jqueryui_datepicker.htm)
- http://stackoverflow.com/questions/3149877/jquery-datepicker-validate-current-input-value
- http://stackoverflow.com/questions/2715626/jquery-datepicker-validate-date-mm-dd-yyyy

**Sample**

```html
<p>Date: <input type="text" id="datepicker" size="30"></p>
<!-- <script src="lib/jquery-ui/jquery.ui.datepicker.validation.js"></script> -->
```

```javascript
<script>
$(function() {
  $("#datepicker").datepicker({
     changeMonth: true,
     changeYear: true,
     dateFormat: "mm/dd/yy",
     'onChangeMonthYear': function(year, month, inst){
         var selectedDate = $(this).datepicker("getDate");
         //$(this).datepicker( "setDate", month + '/1/' + year );
         selectedDate.setMonth(month-1);//month is 1-12, setMonth is 0-11
         selectedDate.setFullYear(year);
         $(this).datepicker( "setDate", selectedDate );
       }
  }).on("blur", function (e) {
      var curDate = $(this).val();
      console.log("curDate="+curDate);
      try {
          var r = $.datepicker.parseDate("mm/dd/yy", curDate);
      } catch(e) {
          //alert('Not VALID!');
          var currentdate = $(this).datepicker("getDate");
          console.log("currentdate="+currentdate);
          $(this).datepicker("setDate", currentdate);
      }
  });
//     $.validator.addMethod("truedate", function (value) {
//         function GetFullYear(year) {
//             var twoDigitCutoffYear = 10 % 100;
//             var cutoffYearCentury = 10 - twoDigitCutoffYear;
//             return ((year > twoDigitCutoffYear) ? (cutoffYearCentury - 100 + year) : (cutoffYearCentury + year));
//         }
//
//     if (value == null || value == '')
//         return true;
//     var yearFirstExp = new RegExp("^\\s*((\\d{4})|(\\d{2}))([-/]|\\. ?)(\\d{1,2})\\4(\\d{1,2})\\.?\\s*$");
//     try {
//         m = value.match(yearFirstExp);
//         var day, month, year;
//         if (m != null && (m[2].length == 4)) {
//             day = m[6];
//             month = m[5];
//             year = (m[2].length == 4) ? m[2] : GetFullYear(parseInt(m[3]));
//         }
//         else {
//             var yearLastExp = new RegExp("^\\s*(\\d{1,2})([-/]|\\. ?)(\\d{1,2})(?:\\s|\\2)((\\d{4})|(\\d{2}))(?:\\s\u0433\\.)?\\s*$");
//             m = value.match(yearLastExp);
//             if (m == null) {
//                 return null;
//             }
//             day = m[3];
//             month = m[1];
//             year = (m[5].length == 4) ? m[5] : GetFullYear(parseInt(m[6]));
//         }
//         month -= 1;
//         var date = new Date(year, month, day);
//         if (year < 100) {
//             date.setFullYear(year);
//         }
//         return (typeof (date) == "object" && year == date.getFullYear() && month == date.getMonth() && day == date.getDate()) ? date.valueOf() : null;
//       }
//       catch (err) {
//           return null;
//       }
//   }, "Please enter an actual date.");
//
// $('#datepicker').validate({
//                 rules: {
//                     insurance_GL: "truedate",
//                 },
//                 messages: {
//                     insurance_GL: "Insurance GL date is not valid",
//                 }
// });
});
</script>
```
