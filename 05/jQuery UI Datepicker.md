### jQuery UI Datepicker

**references**

- [JqueryUI - Datepicker](http://www.tutorialspoint.com/jqueryui/jqueryui_datepicker.htm)
- http://stackoverflow.com/questions/3149877/jquery-datepicker-validate-current-input-value
- http://stackoverflow.com/questions/2715626/jquery-datepicker-validate-date-mm-dd-yyyy
- http://www.tutorialspoint.com/jqueryui/jqueryui_datepicker.htm

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
     // month和year下拉菜单改变时候， input中的值跟着改变
     'onChangeMonthYear': function(year, month, inst){
          //inst:  an internal object that captures the old state of the datepicker, inst.selectedDay(), inst.selectedMonth(), inst.selectedYear()
          //month: the new state of the datepicker
         	var selectedDate = $(this).datepicker("getDate") || new Date();
         	// month: start from 1, selectedDate.getMonth(): jQuery method, start from 0
					selectedDate.setMonth(month-1);
					selectedDate.setFullYear(year);
					var lastDate = otui.parent(this,"ot-datepicker").store.value || new Date();
					try {
							var curselectDate = month +'/'+inst.selectedDay+'/'+year;
							var r = $.datepicker.parseDate(otui.formatters.dateAsJQUI, curselectDate);
						} catch(e) {
							selectedDate = lastDate;
					}
					 $(this).datepicker("setDate", selectedDate);
       }
  // validation, 验证输入的日期是否符合日期规范，如不能输入02/30/2012, 22/02/2012, 04/44/2010
  // 另一种验证方法是引入jquery.ui.datepicker.validation.js
  }).on("change", function (e) {   //另外的选项有： blur, keyup
      var inputDate = $(this).val();
      try {
          var r = $.datepicker.parseDate("mm/dd/yy", inputDate);
      } catch(e) {
          //alert('Not VALID!');
          var currentdate = $(this).datepicker("getDate");
          console.log("currentdate="+currentdate);
          $(this).datepicker("setDate", currentdate);
      }
  });
  
   $("#datepicker").attr("placeholder", "mm-dd-yyyy").datepicker({
        dateFormat: "mm-dd-yy",
        maxDate: "+1",
        showOn: "button",
        showOtherMonths: true
    }).on("change", function(e) {
        var curDate = $(this).datepicker("getDate");
        var maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 1); // add one day
        maxDate.setHours(0, 0, 0, 0); // clear time portion for correct results
        console.log(this.value, curDate, maxDate);
        if (curDate > maxDate) {
            alert("invalid date");
            $(this).datepicker("setDate", maxDate);
        }
    });
  // 其他验证方法，未通过代码去验证，先mark一下
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
