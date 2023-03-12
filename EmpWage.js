


const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOURS = 4;
const FULL_TIME_HOURS = 8;
const WAGE_PR_HOUR = 20;
const NUM_OF_WORKING_DAYS = 20;
const MAX_HRS_IN_MONTH = 160;

let totalEmpHrs = 0, totalWorkingDays = 0, totalEmpWage = 0, day = 0;
let mapDayWithWage;
let empDailyWageArray = [];
let empDailyHrsAndWageArray = [];
let empDailyWageMap = new Map();
let empDailyHrMap = new Map();
function workingHrs(empCheck){
    switch(empCheck){
        case IS_PART_TIME:
            empHrs = PART_TIME_HOURS;
            break;
        case IS_FULL_TIME:
            empHrs = FULL_TIME_HOURS;
            break;
        default:
            empHrs = 0;
    }
    return empHrs;
}
function calculateDailyWage(empHrs){
    return empHrs*WAGE_PR_HOUR;
}
function calculateTotalWage(dailyWage){
    totalEmpWage += dailyWage;
}
function mapDayWithDailyWage(dailyWage){
    day++;
    return day+"=>"+dailyWage;
}
function totalWages(totalWage, dailyWage){
    return totalWage + dailyWage;
}
while(totalEmpHrs <= MAX_HRS_IN_MONTH && totalWorkingDays < NUM_OF_WORKING_DAYS){
    totalWorkingDays++;
    let empCheck = Math.floor(Math.random() * 10)%3;
    let empHrs = workingHrs(empCheck);
    totalEmpHrs += empHrs;
    empDailyWageArray.push(calculateDailyWage(empHrs));
    empDailyHrMap.set(totalWorkingDays, empHrs);
    empDailyWageMap.set(totalWorkingDays, calculateDailyWage(empHrs));
    empDailyHrsAndWageArray.push(
    {
        dayNum: totalWorkingDays,
        dailyHours: empHrs,
        dailyWage: calculateDailyWage(empHrs),
        toString() {
            return '\nDay'+this.dayNum +' => Working Hours: ' + this.dailyHours +
                ' and Wage: ' + this.dailyWage
        },
    });
}
//-------------------- array helper functions --------------
empDailyWageArray.forEach(calculateTotalWage);
mapDayWithWage = empDailyWageArray.map(mapDayWithDailyWage);
let totalWageUsingMap = Array.from(empDailyWageMap.values()).reduce(totalWages, 0);
console.log("Daily wage: \n"+mapDayWithWage);
console.log("Daily wage using map: \n"+JSON.stringify([...empDailyWageMap.entries()]));
console.log("Daily working hrs using map: "+JSON.stringify([...empDailyHrMap.entries()]));
console.log("Employee total wage using map: "+totalWageUsingMap);
console.log("Total working days: "+totalWorkingDays+"\nTotal working hrs: "+
            totalEmpHrs+"\nTotal wage: "+totalEmpWage);
let empWithFullTime = mapDayWithWage.filter(day => day.includes("160"));
console.log("Emp with full time wage on days: "+empWithFullTime);
console.log("First time FullTime wage was earned on: "+mapDayWithWage.find(day => day.includes("160")));
console.log("Check if all elements have full time wage: "+empWithFullTime.every(wage => wage.includes("160")));
console.log("Check if there is any part time wage: "+mapDayWithWage.some(wage => wage.includes("80")));
let totalDaysWorked = 0;
totalDaysWorked = empDailyWageArray.reduce((totalDaysWork, dailyWage) => {
    if(dailyWage > 0)
        totalDaysWork++;
    return totalDaysWork;
}, 0);
console.log("No. of days employee worked: "+ totalDaysWorked); 

//--------------- Arrow Function ------------
const findTotal = (totalVal, dailyVal) => {
    return totalVal + dailyVal;
}
let count = 0;
let totalHrs = Array.from(empDailyHrMap.values()).reduce(findTotal, 0);
let totalSalary = empDailyWageArray.filter(dailyWage => dailyWage>0).reduce(findTotal, 0);
console.log("Emp wage with Arrow function: \nTotal Working hrs: "+totalHrs+"\nTotal wage: "+totalSalary);

let nonWorkingDays = [];
let partWorkingDays = [];
let fullWorkingDays = [];
empDailyHrMap.forEach((value, key, map) => {
    if(value == 8) fullWorkingDays.push(key);
    else if(value == 4) partWorkingDays.push(key);
    else nonWorkingDays.push(key);
});
console.log("Full working days: "+fullWorkingDays);
console.log("Part working days: "+partWorkingDays);
console.log("No working days: "+nonWorkingDays);

//----------------- print Objects -----------
console.log("Daily hours and daily wages: "+empDailyHrsAndWageArray);

//--------------- Arrow Function on object ------------
let empTotalWage = empDailyHrsAndWageArray.filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage>0)
                                        .reduce((totalWage, dailyHrsAndWage) => 
                                        totalWage += dailyHrsAndWage.dailyWage, 0);
let empTotalHrs = empDailyHrsAndWageArray.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours>0)
                                        .reduce((totalHrs, dailyHrsAndWage) => 
                                        totalHrs += dailyHrsAndWage.dailyHours, 0);
console.log("Total Hours : " + empTotalHrs +", Total Wages : " + empTotalWage);      

process.stdout.write("Full Works Days: ");
empDailyHrsAndWageArray.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 8)
                        .forEach(dailyHrsAndWage => process.stdout.write(dailyHrsAndWage.toString()));

let partWorkingDayArr = empDailyHrsAndWageArray.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 4)
                        .map(dailyHrsAndWage => dailyHrsAndWage.toString());
console.log("\nPart-tome Working Days: "+partWorkingDayArr);

let nonWorkingDayNums = empDailyHrsAndWageArray.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 0)
                     .map(dailyHrsAndWage => dailyHrsAndWage.dayNum);
console.log("Non Working Days: "+nonWorkingDayNums);