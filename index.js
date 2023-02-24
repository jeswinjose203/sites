/*
var xlsx = require("xlsx");
var http = require('http');
var fs = require('fs');

const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 


var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'new_schema'
  });

connection.connect();

connection.query("SELECT * FROM new_schema.all_staff_data", function (error, result) {
  if (error) throw error;
  console.log("Result: ", result[0]);
});

connection.end();











var events = require('events');
var eventEmitter = new events.EventEmitter();
let today = new Date();
var cnt,wb,a,data,all_staff_data,length_of_rows;

var myEventHandler = function () {
cnt = 0;
wb = xlsx.readFile("New.xlsx",{cellDates:true});
a = wb.Sheets['All Staff Data'];
data = xlsx.utils.sheet_to_json(a); 
all_staff_data = xlsx.utils.sheet_to_json(a); 
length_of_rows = data.length;
for(let i=0;i<length_of_rows;i++)
{
    if(typeof data[i]['JOINING DATE']!=="undefined")
    {
        var join_date = new Date(data[i]['JOINING DATE']); 
        all_staff_data[i]['JOINING DATE'] = join_date.toDateString();

    }
    if(typeof data[i]['CONTRACT VALIDITY DATE']!=="undefined")
    {
        var temp = data[i]['CONTRACT VALIDITY DATE'];




    var cvd = new Date(data[i]['CONTRACT VALIDITY DATE']); 
    data[i]['CONTRACT VALIDITY DATE'] = cvd.toDateString();
   
    all_staff_data[i]['CONTRACT VALIDITY DATE'] = cvd.toDateString();
    

                    var dat = new Date(data[i]['CONTRACT VALIDITY DATE']);
                    var total_seconds = Math.abs(today - dat) / 1000; 
                    var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
                    data[i]['REMAINING DAYS'] = days_difference_5;
                    all_staff_data[i]['REMAINING DAYS'] = days_difference_5;


                    if(days_difference_5<30)
                    {
                        cnt++;
                    }

                    data[i]['CONTRACT VALIDITY DATE'] = temp;
    }
    if(typeof data[i]['AVSEC TRAINING DUE DATE']!=="undefined")
    {

        var temp = data[i]['AVSEC TRAINING DUE DATE'];



    var atdd = new Date(data[i]['AVSEC TRAINING DUE DATE']); 
    data[i]['AVSEC TRAINING DUE DATE'] = atdd.toDateString();
    all_staff_data[i]['AVSEC TRAINING DUE DATE'] = atdd.toDateString();



                    var dat = new Date(data[i]['AVSEC TRAINING DUE DATE']);
                    var total_seconds = Math.abs(today - dat) / 1000; 
                    var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
                    data[i]['REMAINING DAYS_1'] = days_difference_7;
                    all_staff_data[i]['REMAINING DAYS_1'] = days_difference_7;

                    if(days_difference_7<30)
                    {
                        cnt++;
                    }

                    data[i]['AVSEC TRAINING DUE DATE'] = temp;

    }
    if(typeof data[i]['AEP VALIDITY']!=="undefined")
    {
        var temp = data[i]['AEP VALIDITY'];



    var aepvalidity = new Date(data[i]['AEP VALIDITY']); 
    data[i]['AEP VALIDITY'] = aepvalidity.toDateString();
    all_staff_data[i]['AEP VALIDITY'] = aepvalidity.toDateString();


                    var dat = new Date(data[i]['AEP VALIDITY']);
                    var total_seconds = Math.abs(today - dat) / 1000; 
                    var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24)); 
                    data[i]['REMAINING DAYS_2'] = days_difference_9;
                    all_staff_data[i]['REMAINING DAYS_2'] = days_difference_9;

                    if(days_difference_9<30)
                    {
                        cnt++;
                    }

                    data[i]['AEP VALIDITY'] = temp;
    }
    if(typeof data[i]['ADP VALIDITY']!=="undefined")
    {
        var temp = data[i]['ADP VALIDITY'];

    var adpvalidity = new Date(data[i]['ADP VALIDITY']); 
    data[i]['ADP VALIDITY'] = adpvalidity.toDateString();
    all_staff_data[i]['ADP VALIDITY'] = adpvalidity.toDateString();


                    var dat = new Date(data[i]['ADP VALIDITY']);
                    var total_seconds = Math.abs(today - dat) / 1000; 
                    var days_difference_11 = Math.floor (total_seconds / (60 * 60 * 24)); 
                    data[i]['REMAINING DAYS_3'] = days_difference_11;
                    all_staff_data[i]['REMAINING DAYS_3'] = days_difference_11;

                    if(days_difference_11<30)
                    {
                        cnt++;
                    }

                    data[i]['ADP VALIDITY'] = temp;

    }
    
    
    
    
}
}
eventEmitter.on('load', myEventHandler);

app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.use(express.static(__dirname+'/imag'));

app.get('/',function(req,res){
    fs.readFile("dash.html", function (error, pgResp){
        
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            eventEmitter.emit('load');
            res.write(pgResp);
            res.write(`
            <div class="main-container">
			<div class="main">
				<div class="box-container">
					<div class="box box1">
						<div class="text">
							<img src="engineer.png" alt="logo1" class="imgs">
							<br>
							<a href="ENGINEER.html" class="topic-heading">ENGINEER</a>
							<label class="lbl">`);
                            res.write('0');
                      res.write(`</label>
						</div>
					</div>
					<div class="box box2">
						<div class="text">
							<img src="technician.png" alt="logo2" class="imgs">
							<br>
							<a href="TECHNICIAN.html" class="topic-heading">TECHNICIAN</a>
							<label class="lbl">`);

                            res.write('0');
                            res.write(`</label>
						</div>
					</div>
					<div class="box box3">
						<div class="text">
							<img src="auditor.png" alt="logo3" class="imgs">
							<br>
							<a href="AUDITOR.html" class="topic-heading">AUDITOR</a>
							<label class="lbl">`);
                            res.write('0');
                            res.write(`</label>
						</div>
					</div>
					<div class="box box4">
						<div class="text">
							<img src="tools.png" alt="logo4" class="imgs">
							<br>
							<a href="TOOLS.html" class="topic-heading">TOOLS & EQUIPMENTS</a>
							<label class="lbl">`);
                            res.write('0');
                            res.write(`</label>
						</div>
				</div>
                <div class="box box5">
						<div class="text">
							<img src="other.png" alt="logo5" class="imgs">
							<br>
							<a href="other.html" class="topic-heading">OTHER</a>
							<label class="lbl">`);
                            res.write(cnt.toString());
                            res.write(`</label>
						</div>
				</div>
			</div>
		</div>
            `);
        }
    });
});
app.get('/ENGINEER.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'ENGINEER.html'));
});
app.get('/TOOLS.html',function(req,res){
    res.sendFile(path.join(__dirname,'TOOLS.html'));
});
app.get('/AUDITOR.html',function(req,res){
    res.sendFile(path.join(__dirname,'AUDITOR.html'));
});
app.get('/TECHNICIAN.html',function(req,res){
    res.sendFile(path.join(__dirname,'TECHNICIAN.html'));
});
app.post('/all_staff_data',function(req,res){
    eventEmitter.emit('load');
    if(Number(req.body.SR_NO)>length_of_rows)
    {
        //joining date
        var [day_3, month_3, year_3] = req.body.JOINING_DATE.split('-');
        var result1 = [year_3, month_3, day_3].join('-');
        var result_1 = new Date(result1);
        result_1 = result_1.toDateString();
        //contract validitiy date
        var [day_4, month_4, year_4] = req.body.CONTRACT_VALIDITY_DATE.split('-');
        var result2 = [year_3, month_3, day_3].join('-');
        var result_2 = new Date(result2);
        result_2 = result_2.toDateString();
        //avsec training due date
        var [day_5, month_5, year_5] = req.body.AVSEC.split('-');
        var result3 = [year_5, month_5, day_5].join('-');
        var result_3 = new Date(result3);
        result_3 = result_3.toDateString();
        //aep validity
        var [day_6, month_6, year_6] = req.body.AEP.split('-');
        var result4 = [year_6, month_6, day_6].join('-');
        var result_4 = new Date(result4);
        result_4 = result_4.toDateString();
        //adp validity
        var [day_7, month_7, year_7] = req.body.ADP.split('-');
        var result5 = [year_6, month_6, day_6].join('-');
        var result_5 = new Date(result5);
        result_5 = result_5.toDateString();


        //remaining days
        var dat = new Date(result_2);
        var total_seconds = Math.abs(today - dat) / 1000; 
        var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
        //remaining days_1
        var dat = new Date(result_3);
        var total_seconds = Math.abs(today - dat) / 1000; 
        var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
        //remaining days_2 
        var dat = new Date(result_4);
        var total_seconds = Math.abs(today - dat) / 1000; 
        var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24));
        //remaining days_3
        var dat = new Date(result_5);
        var total_seconds = Math.abs(today - dat) / 1000; 
        var days_difference_11 = Math.floor (total_seconds / (60 * 60 * 24));


        data.push({
            'SR NO':Number(req.body.SR_NO),
            'NAME':req.body.NAME,
            'DESGN':req.body.DESG,
            'JOINING DATE':result_1,
            'CONTRACT VALIDITY DATE':result_2,
            'REMAINING DAYS':days_difference_5,
            'AVSEC TRAINING DUE DATE':result_3,
            'REMAINING DAYS_1':days_difference_7,
            'AEP VALIDITY':result_4,
            'REMAINING DAYS_2':days_difference_9,
            'ADP VALIDITY':result_5,
            'REMAINING DAYS_3':days_difference_11,
            'REMARKS':req.body.REMARKS
        });
        all_staff_data.push({
            'SR NO':Number(req.body.SR_NO),
            'NAME':req.body.NAME,
            'DESGN':req.body.DESG,
            'JOINING DATE':result_1,
            'CONTRACT VALIDITY DATE':result_2,
            'REMAINING DAYS':days_difference_5,
            'AVSEC TRAINING DUE DATE':result_3,
            'REMAINING DAYS_1':days_difference_7,
            'AEP VALIDITY':result_4,
            'REMAINING DAYS_2':days_difference_9,
            'ADP VALIDITY':result_5,
            'REMAINING DAYS_3':days_difference_11,
            'REMARKS':req.body.REMARKS
        });
    }
    else
    {
    var k  = Number(req.body.SR_NO) - 1; //string convert to number
    data[k]['SR NO'] = k+1;
    all_staff_data[k]['SR NO'] = k+1;

    data[k]['NAME'] = req.body.NAME;
    all_staff_data[k]['NAME'] = req.body.NAME;

    data[k]['DESGN'] = req.body.DESG;
    all_staff_data[k]['DESGN'] = req.body.DESG;

    data[k]['STAFF NO'] = Number(req.body.STAFF_NO);//string convert to number
    all_staff_data[k]['STAFF NO'] = Number(req.body.STAFF_NO);
    
    const [day, month, year] = req.body.JOINING_DATE.split('-');
    const result = [year, month, day].join('-');
    data[k]['JOINING DATE'] = new Date(result); 
    all_staff_data[k]['JOINING DATE'] = data[k]['JOINING DATE'].toDateString();

    const [d, m, y] = req.body.CONTRACT_VALIDITY_DATE.split('-');
    const r = [y, m, d].join('-');
    data[k]['CONTRACT VALIDITY DATE'] = new Date(r); 

    all_staff_data[k]['CONTRACT VALIDITY DATE'] = data[k]['CONTRACT VALIDITY DATE'].toDateString();
    

    var dat = new Date(data[k]['CONTRACT VALIDITY DATE']);
    var total_seconds = Math.abs(today - dat) / 1000; 
    var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
    data[k]['REMAINING DAYS'] = days_difference_5;
    all_staff_data[k]['REMAINING DAYS'] = days_difference_5;


    const [da, mo, ye] = req.body.AVSEC.split('-');
    const re = [ye, mo, da].join('-');
    data[k]['AVSEC TRAINING DUE DATE'] = new Date(re); 

    all_staff_data[k]['AVSEC TRAINING DUE DATE'] = data[k]['AVSEC TRAINING DUE DATE'].toDateString();


    var dat = new Date(data[k]['AVSEC TRAINING DUE DATE']);
    var total_seconds = Math.abs(today - dat) / 1000; 
    var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
    data[k]['REMAINING DAYS_1'] = days_difference_7;
    all_staff_data[k]['REMAINING DAYS_1'] = days_difference_7;


    const [day_1, mon, yea] = req.body.AEP.split('-');
    const resu = [yea, mon, day_1].join('-');
    data[k]['AEP VALIDITY'] = new Date(resu); 

    all_staff_data[k]['AEP VALIDITY'] = data[k]['AEP VALIDITY'].toDateString();


    var dat = new Date(data[k]['AEP VALIDITY']);
    var total_seconds = Math.abs(today - dat) / 1000; 
    var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24)); 
    data[k]['REMAINING DAYS_2'] = days_difference_9;
    all_staff_data[k]['REMAINING DAYS_2'] = days_difference_9;


    const [day_2, mont, year_1] = req.body.ADP.split('-');
    const resul = [year_1, mont, day_2].join('-');
    data[k]['ADP VALIDITY'] = new Date(resul); 

    all_staff_data[k]['ADP VALIDITY'] = data[k]['ADP VALIDITY'].toDateString();

    var dat = new Date(data[k]['ADP VALIDITY']);
    var total_seconds = Math.abs(today - dat) / 1000; 
    var days_difference_11 = Math.floor (total_seconds / (60 * 60 * 24)); 
    data[k]['REMAINING DAYS_3'] = days_difference_11;
    all_staff_data[k]['REMAINING DAYS_3'] = days_difference_11;


    data[k]['REMARKS'] = req.body.REMARKS;
    all_staff_data[k]['REMARKS'] = req.body.REMARKS;
    }
    eventEmitter.emit('save');

    return res.redirect('/other.html');
});
app.get('/other.html',function(req,res){
    fs.readFile("other.html", function (error, pgResp){
        
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {

            eventEmitter.emit('load');
            res.write(pgResp);
            res.write("<h2 style='background-color: red; text-align: center';>All-Staff-Data</h2>");





            res.write(`
            <form action="/all_staff_data" method="POST">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="input1" name="SR_NO" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="input2" name="NAME" placeholder="NAME">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="input3" name="DESG" placeholder="DESG">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="input4" name="STAFF_NO" placeholder="STAFF NO">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="input5" name="JOINING_DATE" placeholder="JOINING DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="input6" name="CONTRACT_VALIDITY_DATE" placeholder="CONTRACT VALIDITY DATE">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="input7" name="AVSEC" placeholder="AVSEC TRAINING DUE DATE">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="input8" name="AEP" placeholder="AEP VALIDITY">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="input9" name="ADP" placeholder="ADP VALIDITY">
                </div>
               
                <div class="col">
                <input type="text" class="form-control" id="input10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);






            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>NAME</td><td>DESG</td><td>STAFF NO</td><td>JOINING DATE</td><td>CONTRACT VALIDITY DATE</td><td>REMAINING DAYS</td><td>AVSEC TRAINING DUE DATE</td><td>REMAINING DAYS</td><td>AEP VALIDITY</td><td>REMAINING DAYS</td><td>ADP VALIDITY</td><td>REMAINING DAYS</td><td>REMARKS</td></tr>");
            for(let i=0;i<length_of_rows;i++) 
            {
                res.write("<tr>");
                

                if(typeof data[i]['SR NO']!=="undefined")
                {
                res.write("<td>");
                
                res.write(data[i]['SR NO'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['NAME']!=="undefined")
                {
                res.write("<td>");
                
                res.write(data[i]['NAME'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['DESGN']!=="undefined")
                {
                res.write("<td>");
                res.write(data[i]['DESGN'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                
                if(typeof data[i]['STAFF NO']!=="undefined")
                {
                res.write("<td>");
                
                res.write(data[i]['STAFF NO'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }


                if(typeof data[i]['JOINING DATE']!=="undefined")
                {
                res.write("<td>");
               
                res.write(all_staff_data[i]['JOINING DATE'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['CONTRACT VALIDITY DATE']!=="undefined")
                {

                
                if(all_staff_data[i]['REMAINING DAYS']<5)
                {
                    res.write("<td style='background-color: red;'>");
                }
                else if(all_staff_data[i]['REMAINING DAYS']<15)
                {
                    res.write("<td style='background-color: orange;'>");
                }
                else if(all_staff_data[i]['REMAINING DAYS']<30)
                {
                    res.write("<td style='background-color: yellow;'>");
                }
                else{
                    res.write("<td>");
                }

                
                res.write(all_staff_data[i]['CONTRACT VALIDITY DATE'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['CONTRACT VALIDITY DATE']!=="undefined")
                {
                res.write("<td>");
                res.write(all_staff_data[i]['REMAINING DAYS'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['AVSEC TRAINING DUE DATE']!=="undefined")
                {
                    if(all_staff_data[i]['REMAINING DAYS_1']<5)
                    {
                        res.write("<td style='background-color: red;'>");
                    }
                    else if(all_staff_data[i]['REMAINING DAYS_1']<15)
                    {
                        res.write("<td style='background-color: orange;'>");
                    }
                    else if(all_staff_data[i]['REMAINING DAYS_1']<30)
                    {
                        res.write("<td style='background-color: yellow;'>");
                    }
                    else{
                        res.write("<td>");
                    }


                res.write(all_staff_data[i]['AVSEC TRAINING DUE DATE'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['AVSEC TRAINING DUE DATE']!=="undefined")
                {
                res.write("<td>");
                res.write(all_staff_data[i]['REMAINING DAYS_1'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['AEP VALIDITY']!=="undefined")
                {
                

                    if(all_staff_data[i]['REMAINING DAYS_2']<5)
                    {
                        res.write("<td style='background-color: red;'>");
                    }
                    else if(all_staff_data[i]['REMAINING DAYS_2']<15)
                    {
                        res.write("<td style='background-color: orange;'>");
                    }
                    else if(all_staff_data[i]['REMAINING DAYS_2']<30)
                    {
                        res.write("<td style='background-color: yellow;'>");
                    }
                    else{
                        res.write("<td>");
                    }
                    
                res.write(all_staff_data[i]['AEP VALIDITY'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['AEP VALIDITY']!=="undefined")
                {
                res.write("<td>");
                res.write(all_staff_data[i]['REMAINING DAYS_2'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['ADP VALIDITY']!="undefined")
                {
                


                if(all_staff_data[i]['REMAINING DAYS_3']<5)
                {
                    res.write("<td style='background-color: red;'>");
                }
                else if(all_staff_data[i]['REMAINING DAYS_3']<15)
                {
                    res.write("<td style='background-color: orange;'>");
                }
                else if(all_staff_data[i]['REMAINING DAYS_3']<30)
                {
                    res.write("<td style='background-color: yellow;'>");
                }
                else{
                    res.write("<td>");
                }





                res.write(all_staff_data[i]['ADP VALIDITY'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }

                if(typeof data[i]['ADP VALIDITY']!="undefined")
                {
                res.write("<td>");
                res.write(all_staff_data[i]['REMAINING DAYS_3'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }


                

                

                if(typeof data[i]['REMARKS']!="undefined")
                {
                res.write("<td>");
                res.write(data[i]['REMARKS'].toString());
                res.write("</td>");
                }
                else{
                    res.write("<td></td>");
                }
                
               
                
                res.write("</tr>");
            }
            res.write("</table");
            res.write("</div>");
        }
        
        res.end();
});


});
app.listen(5000, () => {
    console.log('Listening on port ' + 5000);
});

http.createServer(app).listen(8080)

var myEventHandler = function () {
    //same sheet of the same book
    var filename = "All-Staff-data.xlsx";
    wb.Sheets['All Staff Data'] = xlsx.utils.json_to_sheet(data);
    xlsx.writeFile(wb,"New.xlsx");

//different book
wb = xlsx.utils.book_new();
ws = xlsx.utils.json_to_sheet(all_staff_data);
xlsx.utils.book_append_sheet(wb,ws,'All Staff Data');
xlsx.writeFile(wb,filename);
}
eventEmitter.on('save', myEventHandler);
*/





var xlsx = require("xlsx");
var http = require('http');
var fs = require('fs');

const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 

var mysql = require('mysql');
const { error } = require("console");

var length_of_rows=0,cnt=0,length_of_rows_tools=0,length_of_rows_audit_operator,cnt1=0,cnt2=0,length_of_rows_technician=0,length_of_rows_reg_audit=0,cnt3=0,length_of_rows_quality_auditor=0,length_of_rows_internal=0,cnt4=0,length_of_rows_amelicense=0,length_of_rows_amecont=0,length_of_rows_ameauth=0,length_of_rows_line_main,length_of_rows_audit_of_external;
let today = new Date();

var connection = mysql.createConnection({
    host:'localhost',
    user: 'sqluser',
    password: 'password',
    database: 'new_schema'
  });
  connection.connect();
  connection.query("SELECT COUNT(*) AS C FROM new_schema.all_staff_data",function(error,result){
      if (error) throw error;
      length_of_rows = result[0].C;
  });
  connection.query("SELECT COUNT(*) AS C FROM new_schema.tools_and_equipment_calibration",function(error,result){
    if (error) throw error;
    length_of_rows_tools = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.technician_continuation_trainings",function(error,result){
    if (error) throw error;
    length_of_rows_technician = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.regular_audit",function(error,result){
    if (error) throw error;
    length_of_rows_reg_audit = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.audit_by_airline_operators",function(error,result){
    if (error) throw error;
    length_of_rows_audit_operator = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.quality_audit",function(error,result){
    if (error) throw error;
    length_of_rows_quality_auditor = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.line_maintenance",function(error,result){
    if (error) throw error;
    length_of_rows_line_main = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.audit_of_external",function(error,result){
    if (error) throw error;
    length_of_rows_audit_of_external = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.internal_quality_auditors",function(error,result){
    if (error) throw error;
    length_of_rows_internal = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.amelicense",function(error,result){
    if (error) throw error;
    length_of_rows_amelicense = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.ame_continuation_trainings",function(error,result){
    if (error) throw error;
    length_of_rows_amecont = result[0].C;
});
connection.query("SELECT COUNT(*) AS C FROM new_schema.ame_authorisations",function(error,result){
    if (error) throw error;
    length_of_rows_ameauth = result[0].C;
});
  connection.query("SELECT * FROM new_schema.all_staff_data", function (error, result) {
      if (error) throw error;
      for(let i=0;i<length_of_rows;i++)
      {
          var contract = new Date(result[i].contract_validity_date);
          var total_seconds = Math.abs(today - contract) / 1000; 
          var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
          if(days_difference_5<30)
          {
              cnt++;
          }
          var avsec = new Date(result[i].avsec_training_due_date);
          var total_seconds = Math.abs(today - avsec) / 1000; 
          var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
          if(days_difference_7<30)
          {   
              cnt++;
          }
          var aep = new Date(result[i].aep_validity);
          var total_seconds = Math.abs(today - aep) / 1000; 
          var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24)); 
          if(days_difference_9<30)
          {
              cnt++;
          }
          var adp = new Date(result[i].adp_validity);
          var total_seconds = Math.abs(today - adp) / 1000; 
          var days_difference_11 = Math.floor (total_seconds / (60 * 60 * 24)); 
          if(days_difference_11<30)
          {
              cnt++;
          }
      }
  });
  connection.query("SELECT * FROM new_schema.tools_and_equipment_calibration", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_tools;i++)
    {
        var caliberation_rem = new Date(result[i].caliberation_due_date);
        var total_seconds = Math.abs(today - caliberation_rem) / 1000; 
        var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_5<30)
        {
            cnt1++;
        }
    }
});
connection.query("SELECT * FROM new_schema.technician_continuation_trainings", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_technician;i++)
    {
        var h_f = new Date(result[i].hf);
        var total_seconds = Math.abs(today - h_f) / 1000; 
        var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_5<30)
        {
            cnt2++;
        }
        var ews = new Date(result[i].ewis);
        var total_seconds = Math.abs(today - ews) / 1000; 
        var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_7<30)
        {
            cnt2++;
        }
        var s_s = new Date(result[i].sms);
        var total_seconds = Math.abs(today - s_s) / 1000; 
        var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_9<30)
        {
            cnt2++;
        }
        var lm = new Date(result[i].lm_procedure_moe_and_regln);
        var total_seconds = Math.abs(today - lm) / 1000; 
        var days_difference_11 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_11<30)
        {
            cnt2++;
        }
        var stor = new Date(result[i].store_procedure_and_esds);
        var total_seconds = Math.abs(today - stor) / 1000; 
        var days_difference_13 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_13<30)
        {
            cnt2++;
        }
        var dg = new Date(result[i].dgr);
        var total_seconds = Math.abs(today - dg) / 1000; 
        var days_difference_15 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_15<30)
        {
            cnt2++;
        }
    }
});
connection.query("SELECT * FROM new_schema.amelicense", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_amelicense;i++)
    {
        var dgca = new Date(result[i].dgca_lic_validity);
        var total_seconds = Math.abs(today - dgca) / 1000; 
        var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_5<30)
        {
            cnt4++;
        }
        var easa = new Date(result[i].easa_lic_validity);
        var total_seconds = Math.abs(today - easa) / 1000; 
        var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_7<30)
        {
            cnt4++;
        }
    }
});
connection.query("SELECT * FROM new_schema.ame_continuation_trainings", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_amecont;i++)
    {
        var a = new Date(result[i].A320_V2500);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].A320_CFM_LEAP_1A);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].A330_RR_T700);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].A330_NEO_RR_T7000);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].A330_GE_CF6);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].A330_P_AND_W);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].A350_RR_T_XWB);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].B737_CFM56);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].B737_MAX_CFM_LEAP1B);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].B777_GE90);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].B787_GENX);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].ADDNL_REFR);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].HF);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].FTS);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].EWIS);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].SMS);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].REGULATIONS);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
    }
});
connection.query("SELECT * FROM new_schema.ame_authorisations", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_ameauth;i++)
    {
        var a = new Date(result[i].ciasl_authn_validity);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].fly_dxb);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
        var a = new Date(result[i].island_authn_validity);
        var total_seconds = Math.abs(today - a) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt4++;
        }
    }
});
connection.query("SELECT * FROM new_schema.regular_audit", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_reg_audit;i++)
    {
        var cap = new Date(result[i].cap_due_date);
        var total_seconds = Math.abs(today - cap) / 1000; 
        var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_5<30)
        {
            cnt3++;
        }
        var ca = new Date(result[i].ca_submit_due_date);
        var total_seconds = Math.abs(today - ca) / 1000; 
        var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_7<30)
        {
            cnt3++;
        }
    }
});
connection.query("SELECT * FROM new_schema.audit_by_airline_operators", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_audit_operator;i++)
    {
        var c1 = new Date(result[i].cap_due_date);
        var total_seconds = Math.abs(today - c1) / 1000; 
        var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_5<30)
        {
            cnt3++;
        }
        var c2 = new Date(result[i].cap_submit_due_date);
        var total_seconds = Math.abs(today - c2) / 1000; 
        var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_7<30)
        {
            cnt3++;
        }
    }
});
connection.query("SELECT * FROM new_schema.quality_audit", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_quality_auditor;i++)
    {
        var c2 = new Date(result[i].cap_due_date);
        var total_seconds = Math.abs(today - c2) / 1000; 
        var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_5<30)
        {
            cnt3++;
        }
        var c3 = new Date(result[i].cap_submit_due_date);
        var total_seconds = Math.abs(today - c3) / 1000; 
        var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_7<30)
        {
            cnt3++;
        }
    }
});
connection.query("SELECT * FROM new_schema.line_maintenance", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_line_main;i++)
    {
        var c2 = new Date(result[i].cap_due_date);
        var total_seconds = Math.abs(today - c2) / 1000; 
        var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_5<30)
        {
            cnt3++;
        }
        var c3 = new Date(result[i].ca_submit_due_date);
        var total_seconds = Math.abs(today - c3) / 1000; 
        var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference_7<30)
        {
            cnt3++;
        }
    }
});
connection.query("SELECT * FROM new_schema.internal_quality_auditors", function (error, result) {
    if (error) throw error;
    for(let i=0;i<length_of_rows_internal;i++)
    {
        var m1 = new Date(result[i].auth_validity_date);
        var total_seconds = Math.abs(today - m1) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt3++;
        }
        var m2 = new Date(result[i].regulations_due_date);
        var total_seconds = Math.abs(today - m2) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt3++;
        }
        var m3 = new Date(result[i].hf_due_date);
        var total_seconds = Math.abs(today - m3) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt3++;
        }
        var m4 = new Date(result[i].fts_due_date);
        var total_seconds = Math.abs(today - m4) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt3++;
        }
        var m5 = new Date(result[i].ewis_due_date);
        var total_seconds = Math.abs(today - m5) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt3++;
        }
        var m6 = new Date(result[i].sms_due_date);
        var total_seconds = Math.abs(today - m6) / 1000; 
        var days_difference = Math.floor (total_seconds / (60 * 60 * 24)); 
        if(days_difference<30)
        {
            cnt3++;
        }
    }
});
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.use(express.static(__dirname+'/imag'));
app.get('/',function(req,res){
    fs.readFile("index.html", function (error, pgResp){
        if (error) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write(`
            <div class="main-container">
			<div class="main">
				<div class="box-container">
					<div class="box box1">
						<div class="text">
							<img src="engineer.png" alt="logo1" class="imgs">
							<br>
							<a href="ENGINEER.html" class="topic-heading">ENGINEER</a>
							<label class="lbl">`);
                            res.write(cnt4.toString());
                      res.write(`</label>
						</div>
					</div>
					<div class="box box2">
						<div class="text">
							<img src="technician.png" alt="logo2" class="imgs">
							<br>
							<a href="TECHNICIAN.html" class="topic-heading">TECHNICIAN</a>
							<label class="lbl">`);

                            res.write(cnt2.toString());
                            res.write(`</label>
						</div>
					</div>
					<div class="box box3">
						<div class="text">
							<img src="auditor.png" alt="logo3" class="imgs">
							<br>
							<a href="AUDITOR.html" class="topic-heading">AUDITOR</a>
							<label class="lbl">`);
                            res.write(cnt3.toString());
                            res.write(`</label>
						</div>
					</div>
					<div class="box box4">
						<div class="text">
							<img src="tools.png" alt="logo4" class="imgs">
							<br>
							<a href="TOOLS.html" class="topic-heading">TOOLS & EQUIPMENTS</a>
							<label class="lbl">`);
                            res.write(cnt1.toString());
                            res.write(`</label>
						</div>
				</div>
                <div class="box box5">
						<div class="text">
							<img src="other.png" alt="logo5" class="imgs">
							<br>
							<a href="other.html" class="topic-heading">OTHER</a>
							<label class="lbl">`);
                            res.write(cnt.toString());
                            res.write(`</label>
						</div>
				</div>
			</div>
		</div>
            `);

        }
    res.end();

    });
    
});
app.post('/amelicense',function(req,res){
    var sql1 = "INSERT INTO new_schema.amelicense (sr_no,name,license_cat,dgca_lic_no,dgca_lic_validity,easa_lic_no,easa_lic_validity,A320_series_V2500,A320_series_CFM_56,A320_series_LEAP_1A,A320_series_p_and_w,A330_T700,A330_NEO_T70000,A330_GE_CF6,A350_TRENT_XWB,B737_NG_CFM56_7B,B737_MAX_LEAP_1B,B777_GE_90,B787_GEnX,remarks) VALUES ?";
    var values1 = [[Number(req.body.SR_NO),req.body.NAME,req.body.LIC_CAT,req.body.DGCA_LIC_NO,req.body.DGCA_LIC_VALIDITY,req.body.EASA_LIC_NO,req.body.EASA_LIC_VALIDITY,req.body.A320_series_V2500,req.body.A320_series_CFM_56,req.body.A320_series_LEAP_1A,req.body.A320_series_p_and_w,req.body.A330_T700,req.body.A330_NEO_T70000,req.body.A330_GE_CF6,req.body.A350_TRENT_XWB,req.body.B737_NG_CFM56_7B,req.body.B737_MAX_LEAP_1B,req.body.B777_GE_90,req.body.B787_GEnX,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_amelicense++;
        return res.redirect('/ENGINEER.html');
        
    });
    
});
app.post('/ame_continuation_trainings',function(req,res){
    var sql1 = "INSERT INTO new_schema.ame_continuation_trainings (sr_no,name,staff_no,A320_V2500,A320_CFM_LEAP_1A,A330_RR_T700,A330_NEO_RR_T7000,A330_GE_CF6,A330_P_AND_W,A350_RR_T_XWB,B737_CFM56,B737_MAX_CFM_LEAP1B,B777_GE90,B787_GENX,ADDNL_REFR,HF,FTS,EWIS,SMS,REGULATIONS,REMARK) VALUES ?";
    var values1 = [[Number(req.body.SR_NO),req.body.NAME,req.body.STAFF_NO,req.body.A320_V2500,req.body.A320_CFM_LEAP_1A,req.body.A330_RR_T700,req.body.A330_NEO_RR_T7000,req.body.A330_GE_CF6,req.body.A330_P_AND_W,req.body.A350_RR_T_XWB,req.body.B737_CFM56,req.body.B737_MAX_CFM_LEAP1B,req.body.B777_GE90,req.body.B787_GENX,req.body.ADDNL_REFR,req.body.HF,req.body.FTS,req.body.EWIS,req.body.SMS,req.body.REGULATIONS,req.body.REMARK]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_amecont++;
        return res.redirect('/ENGINEER.html');
        
    });
    
});
app.post('/ame_authorisations',function(req,res){
    var sql1 = "INSERT INTO new_schema.ame_authorisations (sr_no,name,staff_no,ciasl_authn_no,ciasl_authn_validity,fly_dxb,island_authn_validity,oman_air,qatar,sri_lanka,kuwait,jazeera,air_arabia,ethihad,gulfair,island,airasia_thai,scoot_tiger,fly__dxb,remark) VALUES ?";
    var values1 = [[Number(req.body.SR_NO),req.body.NAME,req.body.STAFF_NO,req.body.ciasl_authn_no,req.body.ciasl_authn_validity,req.body.fly_dxb,req.body.island_authn_validity,req.body.oman_air,req.body.qatar,req.body.sri_lanka,req.body.kuwait,req.body.jazeera,req.body.air_arabia,req.body.ethihad,req.body.gulfair,req.body.island,req.body.airasia_thai,req.body.scoot_tiger,req.body.fly__dxb,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_ameauth++;
        return res.redirect('/ENGINEER.html');
        
    });
    
});
app.get('/ENGINEER.html',(req,res)=>{
    fs.readFile("ENGINEER.html", function (err, pgResp){
        if (err) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write("<h2 style='background-color: red; text-align: center';>AME LICENSE</h2>");

            res.write(`
            <form action="/amelicense" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="NAME" placeholder="NAME">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="LIC_CAT" placeholder="LIC_CAT">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i4" name="DGCA_LIC_NO" placeholder="DGCA_LIC_NO">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i4" name="DGCA_LIC_VALIDITY" placeholder="DGCA_LIC_VALIDITY">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="EASA_LIC_NO" placeholder="EASA_LIC_NO">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="EASA_LIC_VALIDITY" placeholder="EASA_LIC_VALIDITY">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="A320_series_V2500" placeholder="A320_series_V2500">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="A320_series_CFM_56" placeholder="A320_series_CFM_56">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="A320_series_LEAP_1A" placeholder="A320_series_LEAP_1A">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="A320_series_p_and_w" placeholder="A320_series_p_and_w">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="A330_T700" placeholder="A330_T700">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="A330_NEO_T70000" placeholder="A330_NEO_T70000">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="A330_GE_CF6" placeholder="A330_GE_CF6">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="A350_TRENT_XWB" placeholder="A350_TRENT_XWB">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="B737_NG_CFM56_7B" placeholder="B737_NG_CFM56_7B">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="B737_MAX_LEAP_1B" placeholder="B737_MAX_LEAP_1B">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="B777_GE_90" placeholder="B777_GE_90">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="B787_GEnX" placeholder="B787_GEnX">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write(`<tr>
            <td>sr_no</td>
            <td>name</td>
            <td>license_cat</td>
            <td>dgca lic no</td>
            <td>dgca lic validity</td>
            <td>remaining days</td>
            <td>easa lic no</td>
            <td>easa lic validity</td>
            <td>remaining days</td>
            <td>A320_series_V2500</td>
            <td>A320_series_CFM_56</td>
            <td>A320_series_LEAP_1A</td>
            <td>A320_series_p_and_w</td>
            <td>A330_T700</td>
            <td>A330_NEO_T70000</td>
            <td>A330_GE_CF6</td>
            <td>A350_TRENT_XWB</td>
            <td>B737_NG_CFM56_7B</td>
            <td>B737_MAX_LEAP_1B</td>
            <td>B777_GE_90</td>
            <td>B787_GEnX</td>
            <td>remarks</td>
            </tr>`);
            var jeswin1 = () => {
                
                connection.query("SELECT * FROM new_schema.amelicense", function (error, result) {
                    for(let i=0;i<length_of_rows_amelicense;i++) 
                    {
                        res.write('<tr>');
                            if(result[i].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[i].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].name)
                            {
                            res.write('<td>');
                            res.write(result[i].name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].license_cat)
                            {
                            res.write('<td>');
                            res.write(result[i].license_cat);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].dgca_lic_no)
                            {
                            res.write('<td>');
                            res.write(result[i].dgca_lic_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].dgca_lic_validity)
                            {
                            res.write('<td>');
                            res.write(result[i].dgca_lic_validity);
                            res.write('</td>');
                            var dgca = new Date(result[i].dgca_lic_validity);
                            var total_seconds = Math.abs(today - dgca) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].easa_lic_no)
                            {
                            res.write('<td>');
                            res.write(result[i].easa_lic_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].easa_lic_validity)
                            {
                            res.write('<td>');
                            res.write(result[i].easa_lic_validity);
                            res.write('</td>');
                            var easa = new Date(result[i].easa_lic_validity);
                            var total_seconds = Math.abs(today - easa) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].A320_series_V2500)
                            {
                            res.write('<td>');
                            res.write(result[i].A320_series_V2500);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].A320_series_CFM_56)
                            {
                            res.write('<td>');
                            res.write(result[i].A320_series_CFM_56);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].A320_series_LEAP_1A)
                            {
                            res.write('<td>');
                            res.write(result[i].A320_series_LEAP_1A);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].A320_series_p_and_w)
                            {
                            res.write('<td>');
                            res.write(result[i].A320_series_p_and_w);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].A330_T700)
                            {
                            res.write('<td>');
                            res.write(result[i].A330_T700);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].A330_NEO_T70000)
                            {
                            res.write('<td>');
                            res.write(result[i].A330_NEO_T70000);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].A330_GE_CF6)
                            {
                            res.write('<td>');
                            res.write(result[i].A330_GE_CF6);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].A350_TRENT_XWB)
                            {
                            res.write('<td>');
                            res.write(result[i].A350_TRENT_XWB);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].B737_NG_CFM56_7B)
                            {
                            res.write('<td>');
                            res.write(result[i].B737_NG_CFM56_7B);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].B737_MAX_LEAP_1B)
                            {
                            res.write('<td>');
                            res.write(result[i].B737_MAX_LEAP_1B);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].B777_GE_90)
                            {
                            res.write('<td>');
                            res.write(result[i].B777_GE_90);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].B787_GEnX)
                            {
                            res.write('<td>');
                            res.write(result[i].B787_GEnX);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].remarks)
                            {
                            res.write('<td>');
                            res.write(result[i].remarks);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    fun1();
                });
            };
            jeswin1();
            var fun1 = () => {
                res.write("<h2 style='background-color: red; text-align: center';>AME CONTINUATION TRAININGS</h2>");
        res.write(`
            <form action="/ame_continuation_trainings" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="NAME" placeholder="NAME">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="STAFF_NO" placeholder="STAFF_NO">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="i4" name="A320_V2500" placeholder="A320_V2500">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="A320_CFM_LEAP_1A" placeholder="A320_CFM_LEAP_1A">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="A330_RR_T700" placeholder="A330_RR_T700">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="A330_NEO_RR_T7000" placeholder="A330_NEO_RR_T7000">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="A330_GE_CF6" placeholder="A330_GE_CF6">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="A330_P_AND_W" placeholder="A330_P_AND_W">
                </div>
               <div class="col">
                <input type="text" class="form-control" id="i9" name="A350_RR_T_XWB" placeholder="A350_RR_T-XWB">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="B737_CFM56" placeholder="B737_CFM56">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="B737_MAX_CFM_LEAP1B" placeholder="B737_MAX_CFM_LEAP1B">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="B777_GE90" placeholder="B777_GE90">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="B787_GENX" placeholder="B787_GENX">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="ADDNL_REFR" placeholder="ADDNL_REFR">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="HF" placeholder="HF">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="FTS" placeholder="FTS">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="EWIS" placeholder="EWIS">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="SMS" placeholder="SMS">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REGULATIONS" placeholder="REGULATIONS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write(`<tr><td>SR NO</td>
            <td>name</td>
            <td>staff no</td>
            <td>A320_v2500</td>
            <td>REMAINING DAYS</td>
            <td>A320_CFM_LEAP_1A</td><td>REMAINING DAYS</td>
            <td>A330_RR_T700</td><td>REMAINING DAYS</td>
            <td>A330_NEO_RR_T7000</td><td>REMAINING DAYS</td>
            <td>A330_GE_CF6</td><td>REMAINING DAYS</td>
            <td>A330_P_AND_W</td><td>REMAINING DAYS</td>
            <td>A350_RR_T-XWB</td><td>REMAINING DAYS</td>
            <td>B737_CFM56</td><td>REMAINING DAYS</td>
            <td>B737_MAX_CFM_LEAP1B</td><td>REMAINING DAYS</td>
            <td>B777_GE90</td><td>REMAINING DAYS</td>
            <td>B787_GENX</td><td>REMAINING DAYS</td>
            <td>ADDNL_REFR</td><td>REMAINING DAYS</td>
            <td>HF</td><td>REMAINING DAYS</td>
            <td>FTS</td><td>REMAINING DAYS</td>
            <td>EWIS</td><td>REMAINING DAYS</td>
            <td>SMS</td><td>REMAINING DAYS</td>
            <td>regulations</td><td>REMAINING DAYS</td>
            <td>REMARKS</td></tr>`);
            var jeswin4 = () => {
                
                connection.query("SELECT * FROM new_schema.ame_continuation_trainings", function (err, resu) {
                    for(let k=0;k<length_of_rows_amecont;k++) 
                    {
                        res.write('<tr>');
                            if(resu[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(resu[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].name)
                            {
                            res.write('<td>');
                            res.write(resu[k].name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].staff_no)
                            {
                            res.write('<td>');
                            res.write(resu[k].staff_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].A320_V2500)
                            {
                            res.write('<td>');
                            res.write(resu[k].A320_V2500);
                            res.write('</td>');
                            var a = new Date(resu[k].A320_V2500);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].A320_CFM_LEAP_1A)
                            {
                            res.write('<td>');
                            res.write(resu[k].A320_CFM_LEAP_1A);
                            res.write('</td>');
                            var a = new Date(resu[k].A320_CFM_LEAP_1A);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].A330_RR_T700)
                            {
                            res.write('<td>');
                            res.write(resu[k].A330_RR_T700);
                            res.write('</td>');
                            var a = new Date(resu[k].A330_RR_T700);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].A330_NEO_RR_T7000)
                            {
                            res.write('<td>');
                            res.write(resu[k].A330_NEO_RR_T7000);
                            res.write('</td>');
                            var a = new Date(resu[k].A330_NEO_RR_T7000);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].A330_GE_CF6)
                            {
                            res.write('<td>');
                            res.write(resu[k].A330_GE_CF6);
                            res.write('</td>');
                            var a = new Date(resu[k].A330_GE_CF6);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].A330_P_AND_W)
                            {
                            res.write('<td>');
                            res.write(resu[k].A330_P_AND_W);
                            res.write('</td>');
                            var a = new Date(resu[k].A330_P_AND_W);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].A350_RR_T_XWB)
                            {
                            res.write('<td>');
                            res.write(resu[k].A350_RR_T_XWB);
                            res.write('</td>');
                            var a = new Date(resu[k].A350_RR_T_XWB);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].B737_CFM56)
                            {
                            res.write('<td>');
                            res.write(resu[k].B737_CFM56);
                            res.write('</td>');
                            var a = new Date(resu[k].B737_CFM56);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].B737_MAX_CFM_LEAP1B)
                            {
                            res.write('<td>');
                            res.write(resu[k].B737_MAX_CFM_LEAP1B);
                            res.write('</td>');
                            var a = new Date(resu[k].B737_MAX_CFM_LEAP1B);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].B777_GE90)
                            {
                            res.write('<td>');
                            res.write(resu[k].B777_GE90);
                            res.write('</td>');
                            var a = new Date(resu[k].B777_GE90);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].B787_GENX)
                            {
                            res.write('<td>');
                            res.write(resu[k].B787_GENX);
                            res.write('</td>');
                            var a = new Date(resu[k].B787_GENX);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].ADDNL_REFR)
                            {
                            res.write('<td>');
                            res.write(resu[k].ADDNL_REFR);
                            res.write('</td>');
                            var a = new Date(resu[k].ADDNL_REFR);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].HF)
                            {
                            res.write('<td>');
                            res.write(resu[k].HF);
                            res.write('</td>');
                            var a = new Date(resu[k].HF);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].FTS)
                            {
                            res.write('<td>');
                            res.write(resu[k].FTS);
                            res.write('</td>');
                            var a = new Date(resu[k].FTS);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].EWIS)
                            {
                            res.write('<td>');
                            res.write(resu[k].EWIS);
                            res.write('</td>');
                            var a = new Date(resu[k].EWIS);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].SMS)
                            {
                            res.write('<td>');
                            res.write(resu[k].SMS);
                            res.write('</td>');
                            var a = new Date(resu[k].SMS);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].REGULATIONS)
                            {
                            res.write('<td>');
                            res.write(resu[k].REGULATIONS);
                            res.write('</td>');
                            var a = new Date(resu[k].REGULATIONS);
                            var total_seconds = Math.abs(today - a) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].REMARK)
                            {
                            res.write('<td>');
                            res.write(resu[k].REMARK);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    fun2();
                });
            };
            jeswin4();
            var fun2 = () => {
                res.write("<h2 style='background-color: red; text-align: center';>AME AUTHORISATIONS</h2>");
                res.write(`
                    <form action="/ame_authorisations" method="post">
                     <div class="row">
                      <div class="col">
                      <input type="text" class="form-control" id="i1" name="SR_NO" placeholder="SR NO">
                        </div>
                   
                        <div class="col">
                        <input type="text" class="form-control" id="i2" name="NAME" placeholder="NAME">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i3" name="STAFF_NO" placeholder="STAFF_NO">
                        </div>
                    
                        <div class="col">
                        <input type="text" class="form-control" id="i4" name="ciasl_authn_no" placeholder="ciasl_authn_no">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i5" name="ciasl_authn_validity" placeholder="ciasl_authn_validity">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i6" name="fly_dxb" placeholder="fly_dxb">
                        </div>
                        
                        <div class="col">
                        <input type="text" class="form-control" id="i7" name="island_authn_validity" placeholder="island_authn_validity">
                        </div>
                        
                        <div class="col">
                        <input type="text" class="form-control" id="i8" name="oman_air" placeholder="oman_air">
                        </div>
                        
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="qatar" placeholder="qatar">
                        </div>
                       <div class="col">
                        <input type="text" class="form-control" id="i9" name="sri_lanka" placeholder="sri_lanka">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="kuwait" placeholder="kuwait">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="jazeera" placeholder="jazeera">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="air_arabia" placeholder="air_arabia">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="ethihad" placeholder="ethihad">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="gulfair" placeholder="gulfair">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="island" placeholder="island">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="airasia_thai" placeholder="airasia_thai">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="scoot_tiger" placeholder="scoot_tiger">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i9" name="fly__dxb" placeholder="fly__dxb">
                        </div>
                        <div class="col">
                        <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                        </div>
                        <div class="row">
                        <div class="col-10">
                        </div>
                        <div class="col-2">
                   
                        <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                        
                        </div>
                        </div>
                        </div>
                    </form>
                  `);
        
                    res.write("<div class='table-responsive container'>");
                    res.write("<table class='table table-striped table-hover table-bordered'>");
                    res.write(`<tr><td>SR NO</td>
                    <td>NAME</td>
                    <td>STAFF_NO</td>
                    <td>ciasl_authn_no</td>
                    <td>ciasl_authn_validity</td><td>Remaining Days</td>
                    <td>fly_dxb</td><td>Remaining Days</td>
                    <td>island_authn_validity</td><td>Remaining Days</td>
                    <td>oman_air</td>
                    <td>qatar</td>
                    <td>sri_lanka</td>
                    <td>kuwait</td>
                    <td>jazeera</td>
                    <td>air_arabia</td>
                    <td>ethihad</td>
                    <td>gulfair</td>
                    <td>island</td>
                    <td>airasia_thai</td>
                    <td>scoot_tiger</td>
                    <td>fly__dxb</td>
                    <td>REMARKS</td></tr>`);
                    var jeswin4 = () => {
                        
                        connection.query("SELECT * FROM new_schema.ame_authorisations", function (err, resu) {
                            for(let k=0;k<length_of_rows_ameauth;k++) 
                            {
                                res.write('<tr>');
                                    if(resu[k].sr_no)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].sr_no.toString());
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].name)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].name);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].staff_no)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].staff_no);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].ciasl_authn_no)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].ciasl_authn_no);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].ciasl_authn_validity)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].ciasl_authn_validity);
                                    res.write('</td>');
                                    var a = new Date(resu[k].ciasl_authn_validity);
                                    var total_seconds = Math.abs(today - a) / 1000; 
                                    var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                                    if(days_difference<5)
                                    {
                                        res.write("<td style='background-color: red;'>");
                                    }
                                    else if(days_difference<15)
                                    {
                                        res.write("<td style='background-color: orange;'>");
                                    }
                                    else if(days_difference<30)
                                    {
                                        res.write("<td style='background-color: yellow;'>");
                                    }
                                    else{
                                        res.write("<td>");
                                    }
                                    res.write(days_difference.toString());
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        res.write('<td></td>');
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].fly_dxb)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].fly_dxb);
                                    res.write('</td>');
                                    var a = new Date(resu[k].fly_dxb);
                                    var total_seconds = Math.abs(today - a) / 1000; 
                                    var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                                    if(days_difference<5)
                                    {
                                        res.write("<td style='background-color: red;'>");
                                    }
                                    else if(days_difference<15)
                                    {
                                        res.write("<td style='background-color: orange;'>");
                                    }
                                    else if(days_difference<30)
                                    {
                                        res.write("<td style='background-color: yellow;'>");
                                    }
                                    else{
                                        res.write("<td>");
                                    }
                                    res.write(days_difference.toString());
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        res.write('<td></td>');
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].island_authn_validity)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].island_authn_validity);
                                    res.write('</td>');
                                    var a = new Date(resu[k].island_authn_validity);
                                    var total_seconds = Math.abs(today - a) / 1000; 
                                    var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                                    if(days_difference<5)
                                    {
                                        res.write("<td style='background-color: red;'>");
                                    }
                                    else if(days_difference<15)
                                    {
                                        res.write("<td style='background-color: orange;'>");
                                    }
                                    else if(days_difference<30)
                                    {
                                        res.write("<td style='background-color: yellow;'>");
                                    }
                                    else{
                                        res.write("<td>");
                                    }
                                    res.write(days_difference.toString());
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        res.write('<td></td>');
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].oman_air)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].oman_air);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].qatar)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].qatar);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].sri_lanka)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].sri_lanka);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].kuwait)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].kuwait);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].jazeera)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].jazeera);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].air_arabia)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].air_arabia);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].ethihad)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].ethihad);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].gulfair)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].gulfair);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].island)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].island);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].airasia_thai)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].airasia_thai);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].scoot_tiger)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].scoot_tiger);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].fly__dxb)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].fly__dxb);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                    if(resu[k].remark)
                                    {
                                    res.write('<td>');
                                    res.write(resu[k].remark);
                                    res.write('</td>');
                                    }
                                    else
                                    {
                                        
                                        res.write('<td></td>');
                                    }
                                res.write('</tr>');
                            }
                            res.write("</table>");
                            res.write("</div>");
                            res.end();
                            //fun2();
                        });
                    };
                    jeswin4();
            };
        };
        }
    });
    
});

app.post('/tools_and_equipment_calibration',function(req,res){
    var sql1 = "INSERT INTO new_schema.tools_and_equipment_calibration (sr_no,nomenclature,rang,part_no,ser_no,ciasl_id_no,caliberation_date,caliberation_due_date,caliberation_done_by_orgn,remarks) VALUES ?";
    var values1 = [[Number(req.body.SR_NO1),req.body.NOMENCLATURE,req.body.RANG,req.body.PART_NO,req.body.SER_NO,req.body.CIASL_ID_NO,req.body.CALIBERATION_DATE,req.body.CALIBERATION_DUE_DATE,req.body.CALIBERATION_DONE_BY_ORGN,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_tools++;
        return res.redirect('/TOOLS.html');
        
    });
    
});
app.get('/TOOLS.html',function(req,res){
    fs.readFile("TOOLS.html", function (err, pgResp){
        if (err) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write("<h2 style='background-color: red; text-align: center';>Tools And Equipment Calibration</h2>");

            res.write(`
            <form action="/tools_and_equipment_calibration" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO1" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="NOMENCLATURE" placeholder="Nomenclature">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="RANG" placeholder="Range">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="i4" name="PART_NO" placeholder="Part No">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="SER_NO" placeholder="Ser No">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="CIASL_ID_NO" placeholder="ciasl id">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="CALIBERATION_DATE" placeholder="Calibration Date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="CALIBERATION_DUE_DATE" placeholder="Calibration Due Date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="CALIBERATION_DONE_BY_ORGN" placeholder="calibration done by organisation">
                </div>
               
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>Nomenclature</td><td>range</td><td>part_no</td><td>ser no</td><td>ciasl id no</td><td>calibration date</td><td>calibration due date</td><td>REMAINING DAYS</td><td>calibration done by orgn</td><td>REMARKS</td></tr>");
            var jeswin1 = () => {
                
                connection.query("SELECT * FROM new_schema.tools_and_equipment_calibration", function (error, result) {
                    for(let i=0;i<length_of_rows_tools;i++) 
                    {
                        res.write('<tr>');
                            if(result[i].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[i].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].nomenclature)
                            {
                            res.write('<td>');
                            res.write(result[i].nomenclature);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].rang)
                            {
                            res.write('<td>');
                            res.write(result[i].rang);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].part_no)
                            {
                            res.write('<td>');
                            res.write(result[i].part_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].ser_no)
                            {
                            res.write('<td>');
                            res.write(result[i].ser_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].ciasl_id_no)
                            {
                            res.write('<td>');
                            res.write(result[i].ciasl_id_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].caliberation_date)
                            {
                            res.write('<td>');
                            res.write(result[i].caliberation_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].caliberation_due_date)
                            {
                            res.write('<td>');
                            res.write(result[i].caliberation_due_date);
                            res.write('</td>');
                            
                            var cdd = new Date(result[i].caliberation_due_date);
                            var total_seconds = Math.abs(today - cdd) / 1000; 
                            var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_9<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_9<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_9<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_9.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].caliberation_done_by_orgn)
                            {
                            res.write('<td>');
                            res.write(result[i].caliberation_done_by_orgn);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].remarks)
                            {
                            res.write('<td>');
                            res.write(result[i].remarks);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    res.end();
                });
            };
            jeswin1();
        }
    });
    
});
app.post('/regular_audit',function(req,res){
    var sql1 = "INSERT INTO new_schema.regular_audit (sr_no,regulator,audit_date,no_of_findings,no_of_observations,cap_due_date,cap_submitted_date,ca_submit_due_date,ca_submitted_date,audit_closure_date,remark) VALUES ?";
    var values1 = [[Number(req.body.SR_NO2),req.body.REGULATOR,req.body.AUD_DATE,req.body.NO_OF_FINDINGS,req.body.NO_OF_OBSERV,req.body.CAP_DUE_DATE,req.body.CAP_SUBMT_DATE,req.body.CA_submit_due_date,req.body.CA_SUBMT_DATE,req.body.Audit_clos,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_reg_audit++;
        return res.redirect('/AUDITOR.html');
        
    });
    
});
app.post('/audit_by_airline_operators',function(req,res){
    var sql1 = "INSERT INTO new_schema.audit_by_airline_operators (sr_no,operator,audit_date,no_of_findings,no_of_obsrvns,cap_due_date,cap_submitted_date,cap_submit_due_date,ca_submitted_date,audit_closure_date,remark) VALUES ?";
    var values1 = [[Number(req.body.SR_NO3),req.body.OPERATOR,req.body.AUDITDATE,req.body.NO_OF_FINDINGS,req.body.NO_OF_OBSERV,req.body.CAP_DUE_DATE,req.body.CAP_SUBMT_DATE,req.body.CA_submit_due_date,req.body.CA_SUBMT_DATE,req.body.Audit_clos,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_audit_operator++;
        return res.redirect('/AUDITOR.html');
        
    });
    
});
app.post('/quality_audit',function(req,res){
    var sql1 = "INSERT INTO new_schema.quality_audit (sr_no,auditor_name,audit_date,no_of_findings,no_of_observations,cap_due_date,cap_submitted_date,ca_submit_due_date,ca_submitted_date,audit_closure_date,remark) VALUES ?";
    var values1 = [[Number(req.body.SR_NO4),req.body.NAME,req.body.AUDITDATE,req.body.NO_OF_FINDINGS,req.body.NO_OF_OBSERV,req.body.CAP_DUE_DATE,req.body.CAP_SUBMT_DATE,req.body.CA_submit_due_date,req.body.CA_SUBMT_DATE,req.body.Audit_clos,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_quality_auditor++;
        return res.redirect('/AUDITOR.html');
        
    });
    
});
app.post('/line_maintenance',function(req,res){
    var sql1 = "INSERT INTO new_schema.line_maintenance (sr_no,auditor_name,audit_date,audit_type,no_of_findings,no_of_observations,cap_due_date,cap_submitted_date,ca_submit_due_date,ca_submitted_date,audit_closure_date,remark) VALUES ?";
    var values1 = [[Number(req.body.SR_NO5),req.body.NAME,req.body.AUDITDATE,req.body.AUDITTYPE,req.body.NO_OF_FINDINGS,req.body.NO_OF_OBSERV,req.body.CAP_DUE_DATE,req.body.CAP_SUBMT_DATE,req.body.CA_submit_due_date,req.body.CA_SUBMT_DATE,req.body.Audit_clos,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_line_main++;
        return res.redirect('/AUDITOR.html');
        
    });
    
});
app.post('/audit_of_external',function(req,res){
    var sql1 = "INSERT INTO new_schema.audit_of_external (sr_no,auditee_orgzn,auditor_name,audit_date,no_of_findings,no_of_observations,cap_received_date,cap_approved_date,ca_received_date,ca_approved_date,audit_closed_date,remark) VALUES ?";
    var values1 = [[Number(req.body.SR_NO5),req.body.ORGZN,req.body.NAME,req.body.AUDITDATE,req.body.NO_OF_FINDINGS,req.body.NO_OF_OBSERV,req.body.CAP_received,req.body.CAP_approved,req.body.CA_received,req.body.CA_approved,req.body.Audit_clos,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_audit_of_external++;
        return res.redirect('/AUDITOR.html');
        
    });
    
});
app.post('/internal_quality_auditors',function(req,res){
    var sql1 = "INSERT INTO new_schema.internal_quality_auditors (sr_no,name,auth_no,auth_validity_date,auditor_date_initial,regulations_done_date,regulations_due_date,hf_done_date,hf_due_date,fts_done_date,fts_due_date,ewis_done_date,ewis_due_date,sms_done_date,sms_due_date,remark) VALUES ?";
    var values1 = [[Number(req.body.SR_NO),req.body.NAME,req.body.AUTH_NO,req.body.AUTH_VALID_DATE,req.body.AUDITOR_INT_DATE,req.body.REG_DONE_DATE,req.body.REG_DUE_DATE,req.body.HF_DONE_DATE,req.body.HF_DUE_DATE,req.body.FTS_DONE_DATE,req.body.FTS_DUE_DATE,req.body.EWIS_DONE_DATE,req.body.EWIS_DUE_DATE,req.body.SMS_DONE_DATE,req.body.SMS_DUE_DATE,req.body.REMARKS]];
    connection.query(sql1,[values1],function(err,result){
        if (err) throw err;
       length_of_rows_internal++;
        return res.redirect('/AUDITOR.html');
        
    });
    
});
app.get('/AUDITOR.html',function(req,res){
    fs.readFile("AUDITOR.html", function (err, pgResp){
        if (err) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write("<h2 style='background-color: red; text-align: center';>REGULAR AUDIT</h2>");

            res.write(`
            <form action="/regular_audit" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO2" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="REGULATOR" placeholder="Regulator">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="AUD_DATE" placeholder="Audit Date">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="i4" name="NO_OF_FINDINGS" placeholder="No of findings">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="NO_OF_OBSERV" placeholder="No of observations">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="CAP_DUE_DATE" placeholder="cap due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="CAP_SUBMT_DATE" placeholder="Cap submitted date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="CA_submit_due_date" placeholder="Ca submit due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="CA_SUBMT_DATE" placeholder="Ca submitted date">
                </div>
               <div class="col">
                <input type="text" class="form-control" id="i9" name="Audit_clos" placeholder="Audit closure date">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>REGULATOR</td><td>AUDIT DATE</td><td>NO OF FINDINGS</td><td>NO OF OBSER'S</td><td>CAP DUE DATE</td><td>Remaining days</td><td>CAP SUBMITTED DATE</td><td>CA DUE DATE</td><td>Remaining days</td><td>CA SUBMITTED DATE</td><td>AUDIT CLOSURE DATE</td><td>REMARKS</td></tr>");
            var jeswin3 = () => {
                
                connection.query("SELECT * FROM new_schema.regular_audit", function (error, result) {
                    for(let i=0;i<length_of_rows_reg_audit;i++) 
                    {
                        res.write('<tr>');
                            if(result[i].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[i].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].regulator)
                            {
                            res.write('<td>');
                            res.write(result[i].regulator);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].audit_date)
                            {
                            res.write('<td>');
                            res.write(result[i].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(result[i].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].no_of_observations)
                            {
                            res.write('<td>');
                            res.write(result[i].no_of_observations);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].cap_due_date)
                            {
                            res.write('<td>');
                            res.write(result[i].cap_due_date);
                            res.write('</td>');
                            var cap = new Date(result[i].cap_due_date);
                            var total_seconds = Math.abs(today - cap) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].cap_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[i].cap_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].ca_submit_due_date)
                            {
                            res.write('<td>');
                            res.write(result[i].ca_submit_due_date);
                            res.write('</td>');
                            
                            var ca = new Date(result[i].ca_submit_due_date);
                            var total_seconds = Math.abs(today - ca) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].ca_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[i].ca_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].audit_closure_date)
                            {
                            res.write('<td>');
                            res.write(result[i].audit_closure_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].remark)
                            {
                            res.write('<td>');
                            res.write(result[i].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    fun1();
                    
                });
            };
            jeswin3();
        }
        var fun1 = () =>
        {
        res.write("<h2 style='background-color: red; text-align: center';>AUDIT BY AIRLINE OPERATORS</h2>");
        res.write(`
            <form action="/audit_by_airline_operators" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO3" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="OPERATOR" placeholder="Operator">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="AUDITDATE" placeholder="Audit Date">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="i4" name="NO_OF_FINDINGS" placeholder="No of findings">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="NO_OF_OBSERV" placeholder="No of observations">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="CAP_DUE_DATE" placeholder="cap due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="CAP_SUBMT_DATE" placeholder="Cap submitted date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="CA_submit_due_date" placeholder="Ca submit due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="CA_SUBMT_DATE" placeholder="Ca submitted date">
                </div>
               <div class="col">
                <input type="text" class="form-control" id="i9" name="Audit_clos" placeholder="Audit closure date">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>OPERATOR</td><td>AUDIT DATE</td><td>NO OF FINDINGS</td><td>NO OF OBSER'S</td><td>CAP DUE DATE</td><td>Remaining days</td><td>CAP SUBMITTED DATE</td><td>CA DUE DATE</td><td>Remaining days</td><td>CA SUBMITTED DATE</td><td>AUDIT CLOSURE DATE</td><td>REMARKS</td></tr>");
            var jeswin4 = () => {
                
                connection.query("SELECT * FROM new_schema.audit_by_airline_operators", function (err, resu) {
                    for(let k=0;k<length_of_rows_audit_operator;k++) 
                    {
                        res.write('<tr>');
                            if(resu[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(resu[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].operator)
                            {
                            res.write('<td>');
                            res.write(resu[k].operator);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(resu[k].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].no_of_obsrvns)
                            {
                            res.write('<td>');
                            res.write(resu[k].no_of_obsrvns);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_due_date);
                            res.write('</td>');
                            var c1 = new Date(resu[k].cap_due_date);
                            var total_seconds = Math.abs(today - c1) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_submitted_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_submit_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_submit_due_date);
                            res.write('</td>');
                            
                            var c2 = new Date(resu[k].cap_submit_due_date);
                            var total_seconds = Math.abs(today - c2) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].ca_submitted_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ca_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_closure_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_closure_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].remark)
                            {
                            res.write('<td>');
                            res.write(resu[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    fun2();
                });
            };
            jeswin4();
            var fun2 = () =>{
                res.write("<h2 style='background-color: red; text-align: center';>QUALITY AUDIT-QUALITY DIVISION</h2>");
        res.write(`
            <form action="/quality_audit" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO4" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="NAME" placeholder="Auditor Name">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="AUDITDATE" placeholder="Audit Date">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="i4" name="NO_OF_FINDINGS" placeholder="No of findings">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="NO_OF_OBSERV" placeholder="No of observations">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="CAP_DUE_DATE" placeholder="cap due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="CAP_SUBMT_DATE" placeholder="Cap submitted date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="CA_submit_due_date" placeholder="Ca submit due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="CA_SUBMT_DATE" placeholder="Ca submitted date">
                </div>
               <div class="col">
                <input type="text" class="form-control" id="i9" name="Audit_clos" placeholder="Audit closure date">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>AUDITOR NAME</td><td>AUDIT DATE</td><td>NO OF FINDINGS</td><td>NO OF OBSER'S</td><td>CAP DUE DATE</td><td>Remaining days</td><td>CAP SUBMITTED DATE</td><td>CA DUE DATE</td><td>Remaining days</td><td>CA SUBMITTED DATE</td><td>AUDIT CLOSURE DATE</td><td>REMARKS</td></tr>");
            var jeswin5 = () => {
                
                connection.query("SELECT * FROM new_schema.quality_audit", function (err, resu) {
                    for(let k=0;k<length_of_rows_quality_auditor;k++) 
                    {
                        res.write('<tr>');
                            if(resu[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(resu[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].auditor_name)
                            {
                            res.write('<td>');
                            res.write(resu[k].auditor_name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(resu[k].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].no_of_observations)
                            {
                            res.write('<td>');
                            res.write(resu[k].no_of_observations);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_due_date);
                            res.write('</td>');
                            var c2 = new Date(resu[k].cap_due_date);
                            var total_seconds = Math.abs(today - c2) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_submitted_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].ca_submit_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ca_submit_due_date);
                            res.write('</td>');
                            
                            var c3 = new Date(resu[k].ca_submit_due_date);
                            var total_seconds = Math.abs(today - c3) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].ca_submitted_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ca_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_closure_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_closure_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].remark)
                            {
                            res.write('<td>');
                            res.write(resu[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    fun3();
                });
            };
            jeswin5();
            var fun3 = () =>{
                res.write("<h2 style='background-color: red; text-align: center';>QUALITY AUDIT-LINE MAINTENANCE</h2>");
                res.write(`
                <form action="/line_maintenance" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO5" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="NAME" placeholder="Auditor Name">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="AUDITDATE" placeholder="Audit Date">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="AUDITTYPE" placeholder="Audit Type">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i4" name="NO_OF_FINDINGS" placeholder="No of findings">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="NO_OF_OBSERV" placeholder="No of observations">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="CAP_DUE_DATE" placeholder="cap due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="CAP_SUBMT_DATE" placeholder="Cap submitted date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="CA_submit_due_date" placeholder="Ca submit due date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="CA_SUBMT_DATE" placeholder="Ca submitted date">
                </div>
               <div class="col">
                <input type="text" class="form-control" id="i9" name="Audit_clos" placeholder="Audit closure date">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>AUDITOR NAME</td><td>AUDIT DATE</td><td>AUDIT TYPE</td><td>NO OF FINDINGS</td><td>NO OF OBSER'S</td><td>CAP DUE DATE</td><td>Remaining days</td><td>CAP SUBMITTED DATE</td><td>CA DUE DATE</td><td>Remaining days</td><td>CA SUBMITTED DATE</td><td>AUDIT CLOSURE DATE</td><td>REMARKS</td></tr>");
            var jeswin6 = () => {
                connection.query("SELECT * FROM new_schema.line_maintenance", function (err, resu) {
                    for(let k=0;k<length_of_rows_line_main;k++) 
                    {
                        res.write('<tr>');
                            if(resu[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(resu[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].auditor_name)
                            {
                            res.write('<td>');
                            res.write(resu[k].auditor_name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_type)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_type);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(resu[k].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].no_of_observations)
                            {
                            res.write('<td>');
                            res.write(resu[k].no_of_observations);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_due_date);
                            res.write('</td>');
                            var c2 = new Date(resu[k].cap_due_date);
                            var total_seconds = Math.abs(today - c2) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_submitted_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].ca_submit_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ca_submit_due_date);
                            res.write('</td>');
                            
                            var c3 = new Date(resu[k].ca_submit_due_date);
                            var total_seconds = Math.abs(today - c3) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].ca_submitted_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ca_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_closure_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_closure_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].remark)
                            {
                            res.write('<td>');
                            res.write(resu[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    fun4();
                });
                
            };
        
            jeswin6();
            var fun4 = () =>{
                res.write("<h2 style='background-color: red; text-align: center';>AUDIT OF EXTERNAL AGENCIES BY CIASL AUDITORS</h2>");
                res.write(`
                <form action="/audit_of_external" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO5" placeholder="SR NO">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i2" name="ORGZN" placeholder="Auditor Organization">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i2" name="NAME" placeholder="Auditor Name">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="AUDITDATE" placeholder="Audit Date">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i4" name="NO_OF_FINDINGS" placeholder="No of findings">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="NO_OF_OBSERV" placeholder="No of observations">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="CAP_received" placeholder="cap received date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="CAP_approved" placeholder="Cap approved date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="CA_received" placeholder="Ca received date">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="CA_approved" placeholder="Ca approved date">
                </div>
               <div class="col">
                <input type="text" class="form-control" id="i9" name="Audit_clos" placeholder="Audit closed date">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>AUDITOR ORGZN</td><td>AUDITOR NAME</td><td>AUDIT DATE</td><td>NO OF FINDINGS</td><td>NO OF OBSER'S</td><td>CAP RECEIVED DATE</td><td>CAP APPROVED DATE</td><td>CA RECEIVED DATE</td><td>CA APPROVED DATE</td><td>AUDIT CLOSURE DATE</td><td>REMARKS</td></tr>");
            var jeswin7 = () => {
                connection.query("SELECT * FROM new_schema.audit_of_external", function (err, resu) {
                    for(let k=0;k<length_of_rows_audit_of_external;k++) 
                    {
                        res.write('<tr>');
                            if(resu[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(resu[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].auditor_name)
                            {
                            res.write('<td>');
                            res.write(resu[k].auditee_orgzn);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].auditor_name)
                            {
                            res.write('<td>');
                            res.write(resu[k].auditor_name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(resu[k].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].no_of_observations)
                            {
                            res.write('<td>');
                            res.write(resu[k].no_of_observations);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_received_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_received_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].cap_approved_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].cap_approved_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].ca_received_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ca_received_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].ca_approved_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ca_approved_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].audit_closed_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].audit_closed_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].remark)
                            {
                            res.write('<td>');
                            res.write(resu[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    fun5();
                });
                
            };
            jeswin7();
            var fun5=()=>{
                res.write("<h2 style='background-color: red; text-align: center';>INTERNAL QUALITY AUDITORS</h2>");
                res.write(`
                <form action="/internal_quality_auditors" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO" placeholder="SR NO">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i2" name="NAME" placeholder="Auditor Name">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="AUTH_NO" placeholder="AUTH_NO">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i4" name="AUTH_VALID_DATE" placeholder="AUTH_VALID_DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="AUDITOR_INT_DATE" placeholder="AUDITOR_INT_DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="REG_DONE_DATE" placeholder="REG_DONE_DATE">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="REG_DUE_DATE" placeholder="REG_DUE_DATE">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="HF_DONE_DATE" placeholder="HF_DONE_DATE">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i9" name="HF_DUE_DATE" placeholder="HF_DUE_DATE">
                </div>
               <div class="col">
                <input type="text" class="form-control" id="i9" name="FTS_DONE_DATE" placeholder="FTS_DONE_DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="FTS_DUE_DATE" placeholder="FTS_DUE_DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="EWIS_DONE_DATE" placeholder="FTS_DONE_DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="EWIS_DUE_DATE" placeholder="FTS_DUE_DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="SMS_DONE_DATE" placeholder="FTS_DONE_DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="SMS_DUE_DATE" placeholder="FTS_DUE_DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write(`<tr>
            <td>SR</td>
            <td>NAME</td>
            <td>AUTH_NO</td>
            <td>AUTH_VALID_DATE</td>
            <td>REMAINING_DAYS</td>
            <td>AUDITOR_DATE_INIT</td>
            <td>REGULTNS DONE DATE</td>
            <td>REGULTNS DUE DATE</td>
            <td>REMAINING DAYS</td>
            <td>HF DONE DATE</td>
            <td>HF DUE DATE</td>
           <td>REMAINING DAYS</td>
            <td>FTS DONE DATE</td>
            <td>FTS DUE DATE</td>
            <td>REMAINING DAYS</td>
            <td>EWIS DONE DATE</td>
            <td>EWIS DUE DATE</td>
            <td>REMAINING DAYS</td>
            <td>SMS DONE DATE</td>
            <td>SMS DUE DATE</td>
            <td>REMAINING DAYS</td>
            <td>REMARK</td>
            </tr>`);
            var jeswin8 = () => {
                connection.query("SELECT * FROM new_schema.internal_quality_auditors", function (err, resu) {
                    for(let k=0;k<length_of_rows_internal;k++) 
                    {
                        res.write('<tr>');
                            if(resu[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(resu[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].name)
                            {
                            res.write('<td>');
                            res.write(resu[k].name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].auth_no)
                            {
                            res.write('<td>');
                            res.write(resu[k].auth_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].auth_validity_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].auth_validity_date);
                            res.write('</td>');
                            var m1 = new Date(resu[k].auth_validity_date);
                            var total_seconds = Math.abs(today - m1) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].auditor_date_initial)
                            {
                            res.write('<td>');
                            res.write(resu[k].auditor_date_initial);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].regulations_done_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].regulations_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].regulations_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].regulations_due_date);
                            res.write('</td>');
                            var m2 = new Date(resu[k].regulations_due_date);
                            var total_seconds = Math.abs(today - m2) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].hf_done_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].hf_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].hf_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].hf_due_date);
                            res.write('</td>');
                            var m3 = new Date(resu[k].hf_due_date);
                            var total_seconds = Math.abs(today - m3) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].fts_done_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].fts_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].fts_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].fts_due_date);
                            res.write('</td>');
                            var m4 = new Date(resu[k].fts_due_date);
                            var total_seconds = Math.abs(today - m4) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].ewis_done_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ewis_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].ewis_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].ewis_due_date);
                            res.write('</td>');
                            var m5 = new Date(resu[k].ewis_due_date);
                            var total_seconds = Math.abs(today - m5) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].sms_done_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].sms_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(resu[k].sms_due_date)
                            {
                            res.write('<td>');
                            res.write(resu[k].sms_due_date);
                            res.write('</td>');
                            var m6 = new Date(resu[k].sms_due_date);
                            var total_seconds = Math.abs(today - m6) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(resu[k].remark)
                            {
                            res.write('<td>');
                            res.write(resu[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    res.end();
                });
            };
            jeswin8();
            };
            
        };
        };
    };
};
    });
    
});
app.post('/technician_continuation_trainings',function(req,res){

    var sql = "INSERT INTO new_schema.technician_continuation_trainings (sr_no,name,desgn,staff_no,hf,fts,ewis,sms,lm_procedure_moe_and_regln,store_procedure_and_esds,dgr,remark) VALUES ?";
    var values = [[Number(req.body.SR_NO),req.body.NAME,req.body.DESGN,req.body.STAFF_NO,req.body.HF,req.body.FTS,req.body.EWIS,req.body.SMS,req.body.IMPROC,req.body.STPROC,req.body.DGR,req.body.REMARKS]];
    connection.query(sql,[values],function(err,result){
        if (err) throw err;
        length_of_rows_technician++;
        return res.redirect('/TECHNICIAN.html');
    });
    

});
app.post('/search_auditor',function(req,res){
    fs.readFile("AUDITOR.html", function (err, pgResp){
        if (err) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            var jes = () => {
                connection.query(`SELECT COUNT(*) AS C FROM new_schema.regular_audit WHERE LOWER(regulator) LIKE LOWER('%${req.body.jen}%')`,function(error,resu){
                    if (error) throw error;
                    var lengt = resu[0].C;
                    console.log(lengt);
                    var jen = () => {
                        connection.query(`SELECT * FROM new_schema.regular_audit WHERE LOWER(regulator) LIKE LOWER('%${req.body.jen}%')`, function (error, result) {
                            res.write("<h2 style='background-color: red; text-align: center';>REGULAR AUDIT</h2>");
                            res.write("<div class='table-responsive container'>");
                            res.write("<table class='table table-striped table-hover table-bordered'>");
                            res.write("<tr><td>SR NO</td><td>REGULATOR</td><td>AUDIT DATE</td><td>NO OF FINDINGS</td><td>NO OF OBSER'S</td><td>CAP DUE DATE</td><td>Remaining days</td><td>CAP SUBMITTED DATE</td><td>CA DUE DATE</td><td>Remaining days</td><td>CA SUBMITTED DATE</td><td>AUDIT CLOSURE DATE</td><td>REMARKS</td></tr>");
                            for(let i=0;i<lengt;i++) 
                            {
                                res.write('<tr>');
                            if(result[i].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[i].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].regulator)
                            {
                            res.write('<td>');
                            res.write(result[i].regulator);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].audit_date)
                            {
                            res.write('<td>');
                            res.write(result[i].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(result[i].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].no_of_observations)
                            {
                            res.write('<td>');
                            res.write(result[i].no_of_observations);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].cap_due_date)
                            {
                            res.write('<td>');
                            res.write(result[i].cap_due_date);
                            res.write('</td>');
                            var cap = new Date(result[i].cap_due_date);
                            var total_seconds = Math.abs(today - cap) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].cap_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[i].cap_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].ca_submit_due_date)
                            {
                            res.write('<td>');
                            res.write(result[i].ca_submit_due_date);
                            res.write('</td>');
                            
                            var ca = new Date(result[i].ca_submit_due_date);
                            var total_seconds = Math.abs(today - ca) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].ca_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[i].ca_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].audit_closure_date)
                            {
                            res.write('<td>');
                            res.write(result[i].audit_closure_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].remark)
                            {
                            res.write('<td>');
                            res.write(result[i].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                            
                            res.write("</table></div>");
                            
                            jes1();
                          });
                        };
                    jen();
                    
                });
                var jes1 = () => {
                    connection.query(`SELECT COUNT(*) AS C FROM new_schema.audit_by_airline_operators WHERE LOWER(operator) LIKE LOWER('%${req.body.jen}%')`,function(error,resu){
                        if (error) throw error;
                    var lengt = resu[0].C;
                    console.log(lengt);
                    var jen1 = () => {
                        connection.query(`SELECT * FROM new_schema.audit_by_airline_operators WHERE LOWER(operator) LIKE LOWER('%${req.body.jen}%')`, function (error, result) {
                            res.write("<h2 style='background-color: red; text-align: center';>AUDIT BY AIRLINE OPERATORS</h2>");
                            res.write("<div class='table-responsive container'>");
                            res.write("<table class='table table-striped table-hover table-bordered'>");
                            for(let k=0;k<lengt;k++) 
                    {
                        res.write('<tr>');
                            if(result[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].operator)
                            {
                            res.write('<td>');
                            res.write(result[k].operator);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_date)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(result[k].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].no_of_obsrvns)
                            {
                            res.write('<td>');
                            res.write(result[k].no_of_obsrvns);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].cap_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_due_date);
                            res.write('</td>');
                            var c1 = new Date(result[k].cap_due_date);
                            var total_seconds = Math.abs(today - c1) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].cap_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].cap_submit_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_submit_due_date);
                            res.write('</td>');
                            
                            var c2 = new Date(result[k].cap_submit_due_date);
                            var total_seconds = Math.abs(today - c2) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].ca_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ca_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_closure_date)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_closure_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].remark)
                            {
                            res.write('<td>');
                            res.write(result[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }

                            res.write("</table></div>");
                            jes2();                            
                        });
                    };
                    jen1();
                    });
                    var jes2  = () => {
                        connection.query(`SELECT COUNT(*) AS C FROM new_schema.quality_audit WHERE LOWER(auditor_name) LIKE LOWER('%${req.body.jen}%')`,function(error,resu){
                            if (error) throw error;
                    var lengt = resu[0].C;
                    console.log(lengt);
                    var jen2 = () => {
                        connection.query(`SELECT * FROM new_schema.quality_audit WHERE LOWER(auditor_name) LIKE LOWER('%${req.body.jen}%')`, function (error, result) {
                            res.write("<h2 style='background-color: red; text-align: center';>QUALITY AUDIT-QUALITY DIVISION</h2>");
                            res.write("<div class='table-responsive container'>");
                            res.write("<table class='table table-striped table-hover table-bordered'>");

                            for(let k=0;k<lengt;k++) 
                    {
                        res.write('<tr>');
                            if(result[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].auditor_name)
                            {
                            res.write('<td>');
                            res.write(result[k].auditor_name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_date)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(result[k].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].no_of_observations)
                            {
                            res.write('<td>');
                            res.write(result[k].no_of_observations);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].cap_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_due_date);
                            res.write('</td>');
                            var c2 = new Date(result[k].cap_due_date);
                            var total_seconds = Math.abs(today - c2) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].cap_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].ca_submit_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ca_submit_due_date);
                            res.write('</td>');
                            
                            var c3 = new Date(result[k].ca_submit_due_date);
                            var total_seconds = Math.abs(today - c3) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].ca_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ca_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_closure_date)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_closure_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].remark)
                            {
                            res.write('<td>');
                            res.write(result[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    };
                            res.write("</table></div>");
                            jes3();
                        });
                    };
                    jen2();
                        });
                        var jes3 = () => {
                            connection.query(`SELECT COUNT(*) AS C FROM new_schema.line_maintenance WHERE LOWER(auditor_name) LIKE LOWER('%${req.body.jen}%')`,function(error,resu){
                                if (error) throw error;
                                var lengt = resu[0].C;
                                console.log(lengt);
                                var jen3 = () => {
                                    connection.query(`SELECT * FROM new_schema.line_maintenance WHERE LOWER(auditor_name) LIKE LOWER('%${req.body.jen}%')`, function (error, result) {
                                        res.write("<h2 style='background-color: red; text-align: center';>QUALITY AUDIT-LINE MAINTENANCE</h2>");
                                        res.write("<div class='table-responsive container'>");
                                        res.write("<table class='table table-striped table-hover table-bordered'>");
                                        for(let k=0;k<lengt;k++) 
                                    {
                        res.write('<tr>');
                            if(result[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].auditor_name)
                            {
                            res.write('<td>');
                            res.write(result[k].auditor_name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_date)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_type)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_type);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(result[k].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].no_of_observations)
                            {
                            res.write('<td>');
                            res.write(result[k].no_of_observations);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].cap_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_due_date);
                            res.write('</td>');
                            var c2 = new Date(result[k].cap_due_date);
                            var total_seconds = Math.abs(today - c2) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].cap_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].ca_submit_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ca_submit_due_date);
                            res.write('</td>');
                            
                            var c3 = new Date(result[k].ca_submit_due_date);
                            var total_seconds = Math.abs(today - c3) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].ca_submitted_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ca_submitted_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_closure_date)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_closure_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].remark)
                            {
                            res.write('<td>');
                            res.write(result[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }

                                        res.write("</table></div>");
                                        jes4();
                                    });
                                };
                                jen3();
                            });
                            var jes4 = () => {
                                connection.query(`SELECT COUNT(*) AS C FROM new_schema.audit_of_external WHERE LOWER(auditor_name) LIKE LOWER('%${req.body.jen}%')`,function(error,resu){
                                    if (error) throw error;
                            var lengt = resu[0].C;
                            console.log(lengt);
                                    var jen4 = () => {
                                        connection.query(`SELECT * FROM new_schema.audit_of_external WHERE LOWER(auditor_name) LIKE LOWER('%${req.body.jen}%')`, function (error, result) {
                                            res.write("<h2 style='background-color: red; text-align: center';>AUDIT OF EXTERNAL AGENCIES BY CIASL AUDITORS</h2>");
                                            res.write("<div class='table-responsive container'>");
                                            res.write("<table class='table table-striped table-hover table-bordered'>");

                                            for(let k=0;k<lengt;k++) 
                    {
                        res.write('<tr>');
                            if(result[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].auditor_name)
                            {
                            res.write('<td>');
                            res.write(result[k].auditee_orgzn);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].auditor_name)
                            {
                            res.write('<td>');
                            res.write(result[k].auditor_name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_date)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].no_of_findings)
                            {
                            res.write('<td>');
                            res.write(result[k].no_of_findings);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].no_of_observations)
                            {
                            res.write('<td>');
                            res.write(result[k].no_of_observations);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].cap_received_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_received_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].cap_approved_date)
                            {
                            res.write('<td>');
                            res.write(result[k].cap_approved_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].ca_received_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ca_received_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].ca_approved_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ca_approved_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].audit_closed_date)
                            {
                            res.write('<td>');
                            res.write(result[k].audit_closed_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].remark)
                            {
                            res.write('<td>');
                            res.write(result[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }

                                            res.write("</table></div>");
                                            jes5();

                                        });
                                    };
                                    jen4();
                                });
                                var jes5 = () => {
                                    connection.query(`SELECT COUNT(*) AS C FROM new_schema.internal_quality_auditors WHERE LOWER(name) LIKE LOWER('%${req.body.jen}%')`,function(error,resu){
                                        if (error) throw error;
                                var lengt = resu[0].C;
                                console.log(lengt);
                                        var jen5 = () => {
                                            connection.query(`SELECT * FROM new_schema.internal_quality_auditors WHERE LOWER(name) LIKE LOWER('%${req.body.jen}%')`, function (error, result) {
                                                res.write("<h2 style='background-color: red; text-align: center';>INTERNAL QUALITY AUDITORS</h2>");
                                                res.write("<div class='table-responsive container'>");
                                                res.write("<table class='table table-striped table-hover table-bordered'>");

                                                for(let k=0;k<lengt;k++) 
                    {
                        res.write('<tr>');
                            if(result[k].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[k].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].name)
                            {
                            res.write('<td>');
                            res.write(result[k].name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].auth_no)
                            {
                            res.write('<td>');
                            res.write(result[k].auth_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].auth_validity_date)
                            {
                            res.write('<td>');
                            res.write(result[k].auth_validity_date);
                            res.write('</td>');
                            var m1 = new Date(result[k].auth_validity_date);
                            var total_seconds = Math.abs(today - m1) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].auditor_date_initial)
                            {
                            res.write('<td>');
                            res.write(result[k].auditor_date_initial);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].regulations_done_date)
                            {
                            res.write('<td>');
                            res.write(result[k].regulations_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].regulations_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].regulations_due_date);
                            res.write('</td>');
                            var m2 = new Date(result[k].regulations_due_date);
                            var total_seconds = Math.abs(today - m2) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].hf_done_date)
                            {
                            res.write('<td>');
                            res.write(result[k].hf_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].hf_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].hf_due_date);
                            res.write('</td>');
                            var m3 = new Date(result[k].hf_due_date);
                            var total_seconds = Math.abs(today - m3) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].fts_done_date)
                            {
                            res.write('<td>');
                            res.write(result[k].fts_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].fts_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].fts_due_date);
                            res.write('</td>');
                            var m4 = new Date(result[k].fts_due_date);
                            var total_seconds = Math.abs(today - m4) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].ewis_done_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ewis_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].ewis_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].ewis_due_date);
                            res.write('</td>');
                            var m5 = new Date(result[k].ewis_due_date);
                            var total_seconds = Math.abs(today - m5) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].sms_done_date)
                            {
                            res.write('<td>');
                            res.write(result[k].sms_done_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[k].sms_due_date)
                            {
                            res.write('<td>');
                            res.write(result[k].sms_due_date);
                            res.write('</td>');
                            var m6 = new Date(result[k].sms_due_date);
                            var total_seconds = Math.abs(today - m6) / 1000; 
                            var days_difference = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[k].remark)
                            {
                            res.write('<td>');
                            res.write(result[k].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                                                res.write("</table></div>");
                                                res.end();
                                            });
                                        };
                                        jen5();
                                    });
                                };
                            };
                        };
                    };
                };
            };
            jes();
        }
        
    });
    
});
app.post('/search_technician',function(req,res){
    fs.readFile("TECHNICIAN.html", function (err, pgResp){
        if (err) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            
            console.log(req.body.jen);
            var jes = () => {
                connection.query(`SELECT COUNT(*) AS C FROM new_schema.technician_continuation_trainings WHERE LOWER(name) LIKE LOWER('%${req.body.jen}%')`,function(error,resu){
                    if (error) throw error;
                    var lengt = resu[0].C;
                    console.log(lengt);
                    var jen = () => {
                        connection.query(`SELECT * FROM new_schema.technician_continuation_trainings WHERE LOWER(name) LIKE LOWER('%${req.body.jen}%')`, function (error, result) {
                            res.write("<div class='table-responsive container'>");
                            res.write("<table class='table table-striped table-hover table-bordered'>");
                            res.write("<tr><td>SR NO</td><td>Name</td><td>Desgn</td><td>Staff No</td><td>HF</td><td>Remaining days</td><td>EWIS</td><td>Remaining days</td><td>SMS</td><td>Remaining days</td><td>IM proc. moe & regln</td><td>Remaining days</td><td>store proc & esds</td><td>Remaining days</td><td>DGR</td><td>Remaining days</td><td>REMARKS</td></tr>");
                            
                            for(let i=0;i<lengt;i++) 
                            {
                                
                                res.write('<tr>');
                            if(result[i].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[i].sr_no.toString());
                            console.log(result[i].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].name)
                            {
                            res.write('<td>');
                            res.write(result[i].name);
                            console.log(result[i].name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].desgn)
                            {
                            res.write('<td>');
                            res.write(result[i].desgn);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].staff_no)
                            {
                            res.write('<td>');
                            res.write(result[i].staff_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].hf)
                            {
                            res.write('<td>');
                            res.write(result[i].hf);
                            res.write('</td>');
                            var h_f = new Date(result[i].hf);
                            var total_seconds = Math.abs(today - h_f) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].ewis)
                            {
                            res.write('<td>');
                            res.write(result[i].ewis);
                            res.write('</td>');
                            var ews = new Date(result[i].ewis);
                            var total_seconds = Math.abs(today - ews) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].sms)
                            {
                            res.write('<td>');
                            res.write(result[i].sms);
                            res.write('</td>');
                            var s_s = new Date(result[i].sms);
                            var total_seconds = Math.abs(today - s_s) / 1000; 
                            var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_9<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_9<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_9<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_9.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].lm_procedure_moe_and_regln)
                            {
                            res.write('<td>');
                            res.write(result[i].lm_procedure_moe_and_regln);
                            res.write('</td>');
                            var lm = new Date(result[i].lm_procedure_moe_and_regln);
                            var total_seconds = Math.abs(today - lm) / 1000; 
                            var days_difference_11 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_11<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_11<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_11<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_11.toString());
                            res.write('</td>');
                            
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].store_procedure_and_esds)
                            {
                            res.write('<td>');
                            res.write(result[i].store_procedure_and_esds);
                            res.write('</td>');
                            var stor = new Date(result[i].sms);
                            var total_seconds = Math.abs(today - stor) / 1000; 
                            var days_difference_13 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_13<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_13<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_13<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_13.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].dgr)
                            {
                            res.write('<td>');
                            res.write(result[i].dgr);
                            res.write('</td>');
                            var dg = new Date(result[i].sms);
                            var total_seconds = Math.abs(today - dg) / 1000; 
                            var days_difference_15 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_15<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_15<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_15<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_15.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].remark)
                            {
                            res.write('<td>');
                            res.write(result[i].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            res.write('</tr>');
                            }
                            res.write("</table></div>");
                            res.end();
                          });
                          
                          
                            
                        };
                    jen();
                    
                });
            };
            jes();
            
        }
        
        
    });
    
});
app.post('/search_tools',function(req,res){
    fs.readFile("TOOLS.html", function (err, pgResp){
        if (err) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            
            console.log(req.body.jen);
            var jes = () => {
                connection.query(`SELECT COUNT(*) AS C FROM new_schema.tools_and_equipment_calibration WHERE LOWER(nomenclature) LIKE LOWER('%${req.body.jen}%')`,function(error,resu){
                    if (error) throw error;
                    var lengt = resu[0].C;
                    console.log(lengt);
                    var jen = () => {
                        connection.query(`SELECT * FROM new_schema.tools_and_equipment_calibration WHERE LOWER(nomenclature) LIKE LOWER('%${req.body.jen}%')`, function (error, result) {
                            res.write("<h2 style='background-color: red; text-align: center';>Tools And Equipment Calibration</h2>");
                            res.write("<div class='table-responsive container'>");
                            res.write("<table class='table table-striped table-hover table-bordered'>");
                            res.write("<tr><td>SR NO</td><td>Nomenclature</td><td>range</td><td>part_no</td><td>ser no</td><td>ciasl id no</td><td>calibration date</td><td>calibration due date</td><td>REMAINING DAYS</td><td>calibration done by orgn</td><td>REMARKS</td></tr>");
                            
                            for(let i=0;i<lengt;i++) 
                    {
                        res.write('<tr>');
                            if(result[i].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[i].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].nomenclature)
                            {
                            res.write('<td>');
                            res.write(result[i].nomenclature);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].rang)
                            {
                            res.write('<td>');
                            res.write(result[i].rang);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].part_no)
                            {
                            res.write('<td>');
                            res.write(result[i].part_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].ser_no)
                            {
                            res.write('<td>');
                            res.write(result[i].ser_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].ciasl_id_no)
                            {
                            res.write('<td>');
                            res.write(result[i].ciasl_id_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].caliberation_date)
                            {
                            res.write('<td>');
                            res.write(result[i].caliberation_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].caliberation_due_date)
                            {
                            res.write('<td>');
                            res.write(result[i].caliberation_due_date);
                            res.write('</td>');
                            
                            var cdd = new Date(result[i].caliberation_due_date);
                            var total_seconds = Math.abs(today - cdd) / 1000; 
                            var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_9<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_9<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_9<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_9.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].caliberation_done_by_orgn)
                            {
                            res.write('<td>');
                            res.write(result[i].caliberation_done_by_orgn);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].remarks)
                            {
                            res.write('<td>');
                            res.write(result[i].remarks);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                            res.write("</table></div>");
                            res.end();
                          });
                          
                          
                            
                        };
                    jen();
                    
                });
            };
            jes();
            
        }
        
        
    });
    
});
app.get('/TECHNICIAN.html',function(req,res){
    fs.readFile("TECHNICIAN.html", function (err, pgResp){
        if (err) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write("<h2 style='background-color: red; text-align: center';>TECHNICIANS / STORE INSPECTOR/TECHNICAL ASST  CONTINUATION TRAININGS</h2>");

            res.write(`
            <form action="/technician_continuation_trainings" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="i1" name="SR_NO" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="i2" name="NAME" placeholder="Name">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="DESGN" placeholder="Desgn">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="i4" name="STAFF_NO" placeholder="Staff No">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i5" name="HF" placeholder="HF">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i3" name="FTS" placeholder="FTS">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i6" name="EWIS" placeholder="EWIS">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i7" name="SMS" placeholder="SMS">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="i8" name="IMPROC" placeholder="IM proc. moe & regln">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="STPROC" placeholder="store proc & esds">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="i9" name="DGR" placeholder="DGR">
                </div>
               
                <div class="col">
                <input type="text" class="form-control" id="i10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>Name</td><td>Desgn</td><td>Staff No</td><td>HF</td><td>Remaining days</td><td>EWIS</td><td>Remaining days</td><td>SMS</td><td>Remaining days</td><td>IM proc. moe & regln</td><td>Remaining days</td><td>store proc & esds</td><td>Remaining days</td><td>DGR</td><td>Remaining days</td><td>REMARKS</td></tr>");
            var jeswin2 = () => {
                
                connection.query("SELECT * FROM new_schema.technician_continuation_trainings", function (error, result) {
                    for(let i=0;i<length_of_rows_technician;i++) 
                    {
                        res.write('<tr>');
                            if(result[i].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[i].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].name)
                            {
                            res.write('<td>');
                            res.write(result[i].name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].desgn)
                            {
                            res.write('<td>');
                            res.write(result[i].desgn);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].staff_no)
                            {
                            res.write('<td>');
                            res.write(result[i].staff_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].hf)
                            {
                            res.write('<td>');
                            res.write(result[i].hf);
                            res.write('</td>');
                            var h_f = new Date(result[i].hf);
                            var total_seconds = Math.abs(today - h_f) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_5.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].ewis)
                            {
                            res.write('<td>');
                            res.write(result[i].ewis);
                            res.write('</td>');
                            var ews = new Date(result[i].ewis);
                            var total_seconds = Math.abs(today - ews) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].sms)
                            {
                            res.write('<td>');
                            res.write(result[i].sms);
                            res.write('</td>');
                            var s_s = new Date(result[i].sms);
                            var total_seconds = Math.abs(today - s_s) / 1000; 
                            var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_9<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_9<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_9<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_9.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].lm_procedure_moe_and_regln)
                            {
                            res.write('<td>');
                            res.write(result[i].lm_procedure_moe_and_regln);
                            res.write('</td>');
                            var lm = new Date(result[i].lm_procedure_moe_and_regln);
                            var total_seconds = Math.abs(today - lm) / 1000; 
                            var days_difference_11 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_11<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_11<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_11<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_11.toString());
                            res.write('</td>');
                            
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].store_procedure_and_esds)
                            {
                            res.write('<td>');
                            res.write(result[i].store_procedure_and_esds);
                            res.write('</td>');
                            var stor = new Date(result[i].sms);
                            var total_seconds = Math.abs(today - stor) / 1000; 
                            var days_difference_13 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_13<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_13<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_13<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_13.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].dgr)
                            {
                            res.write('<td>');
                            res.write(result[i].dgr);
                            res.write('</td>');
                            var dg = new Date(result[i].sms);
                            var total_seconds = Math.abs(today - dg) / 1000; 
                            var days_difference_15 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_15<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_15<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_15<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_15.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].remark)
                            {
                            res.write('<td>');
                            res.write(result[i].remark);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    res.end();
                });
            };
            jeswin2();
        }
        

    });
    
});
app.post('/all_staff_data',function(req,res){
    var sql = "INSERT INTO new_schema.all_staff_data (sr_no,name,desgn,joining_date,contract_validity_date,avsec_training_due_date,aep_validity,adp_validity,remarks,staff_no) VALUES ?";
    var values = [[Number(req.body.SR_NO),req.body.NAME,req.body.DESG,req.body.JOINING_DATE,req.body.CONTRACT_VALIDITY_DATE,req.body.AVSEC,req.body.AEP,req.body.ADP,req.body.REMARKS,req.body.STAFF_NO]];
    connection.query(sql,[values],function(err,result){
        if (err) throw err;
        length_of_rows++;
        return res.redirect('/other.html');
    });
    

});
app.get('/other.html',function(req,res){
    

    fs.readFile("other.html", function (err, pgResp){
        if (err) {
            res.writeHead(404);
            res.write('Contents you are looking are Not Found');
        } else {
            res.write(pgResp);
            res.write("<h2 style='background-color: red; text-align: center';>All-Staff-Data</h2>");

            res.write(`
            <form action="/all_staff_data" method="post">
             <div class="row">
              <div class="col">
              <input type="text" class="form-control" id="input1" name="SR_NO" placeholder="SR NO">
                </div>
           
                <div class="col">
                <input type="text" class="form-control" id="input2" name="NAME" placeholder="NAME">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="input3" name="DESG" placeholder="DESG">
                </div>
            
                <div class="col">
                <input type="text" class="form-control" id="input4" name="STAFF_NO" placeholder="STAFF NO">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="input5" name="JOINING_DATE" placeholder="JOINING DATE">
                </div>
                <div class="col">
                <input type="text" class="form-control" id="input6" name="CONTRACT_VALIDITY_DATE" placeholder="CONTRACT VALIDITY DATE">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="input7" name="AVSEC" placeholder="AVSEC TRAINING DUE DATE">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="input8" name="AEP" placeholder="AEP VALIDITY">
                </div>
                
                <div class="col">
                <input type="text" class="form-control" id="input9" name="ADP" placeholder="ADP VALIDITY">
                </div>
               
                <div class="col">
                <input type="text" class="form-control" id="input10" name="REMARKS" placeholder="REMARKS">
                </div>
                <div class="row">
                <div class="col-10">
                </div>
                <div class="col-2">
           
                <button type="submit" class="btn btn-primary mb-3" style="margin-top: 4%;">SAVE CHANGES</button>
                
                </div>
                </div>
                </div>
            </form>
          `);

            res.write("<div class='table-responsive container'>");
            res.write("<table class='table table-striped table-hover table-bordered'>");
            res.write("<tr><td>SR NO</td><td>NAME</td><td>DESG</td><td>STAFF NO</td><td>JOINING DATE</td><td>CONTRACT VALIDITY DATE</td><td>REMAINING DAYS</td><td>AVSEC TRAINING DUE DATE</td><td>REMAINING DAYS</td><td>AEP VALIDITY</td><td>REMAINING DAYS</td><td>ADP VALIDITY</td><td>REMAINING DAYS</td><td>REMARKS</td></tr>");
            var jeswin = () => {
                
                connection.query("SELECT * FROM new_schema.all_staff_data", function (error, result) {
                    for(let i=0;i<length_of_rows;i++) 
                    {
                        res.write('<tr>');
                            if(result[i].sr_no)
                            {
                            res.write('<td>');
                            res.write(result[i].sr_no.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].name)
                            {
                            res.write('<td>');
                            res.write(result[i].name);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].desgn)
                            {
                            res.write('<td>');
                            res.write(result[i].desgn);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].staff_no)
                            {
                            res.write('<td>');
                            res.write(result[i].staff_no);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].joining_date)
                            {
                            res.write('<td>');
                            res.write(result[i].joining_date);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                            if(result[i].contract_validity_date)
                            {
                            res.write('<td>');
                            res.write(result[i].contract_validity_date);
                            res.write('</td>');
                            
                            var contract = new Date(result[i].contract_validity_date);
                            var total_seconds = Math.abs(today - contract) / 1000; 
                            var days_difference_5 = Math.floor (total_seconds / (60 * 60 * 24)); 
                            if(days_difference_5<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_5<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_5<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                                res.write(days_difference_5.toString());
                                res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }


                            if(result[i].avsec_training_due_date)
                            {
                            res.write('<td>');
                            res.write(result[i].avsec_training_due_date);
                            res.write('</td>');
                            
                            var avsec = new Date(result[i].avsec_training_due_date);
                            var total_seconds = Math.abs(today - avsec) / 1000; 
                            var days_difference_7 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_7<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_7<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_7<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_7.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].aep_validity)
                            {
                            res.write('<td>');
                            res.write(result[i].aep_validity);
                            res.write('</td>');
                            
                            var aep = new Date(result[i].aep_validity);
                            var total_seconds = Math.abs(today - aep) / 1000; 
                            var days_difference_9 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_9<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_9<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_9<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_9.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].adp_validity)
                            {
                            res.write('<td>');
                            res.write(result[i].adp_validity);
                            res.write('</td>');
                            var adp = new Date(result[i].adp_validity);
                            var total_seconds = Math.abs(today - adp) / 1000; 
                            var days_difference_11 = Math.floor (total_seconds / (60 * 60 * 24));
                            if(days_difference_11<5)
                            {
                                res.write("<td style='background-color: red;'>");
                            }
                            else if(days_difference_11<15)
                            {
                                res.write("<td style='background-color: orange;'>");
                            }
                            else if(days_difference_11<30)
                            {
                                res.write("<td style='background-color: yellow;'>");
                            }
                            else{
                                res.write("<td>");
                            }
                            res.write(days_difference_11.toString());
                            res.write('</td>');
                            }
                            else
                            {
                                res.write('<td></td>');
                                res.write('<td></td>');
                            }
                            if(result[i].remarks)
                            {
                            res.write('<td>');
                            res.write(result[i].remarks);
                            res.write('</td>');
                            }
                            else
                            {
                                
                                res.write('<td></td>');
                            }
                        res.write('</tr>');
                    }
                    res.write("</table>");
                    res.write("</div>");
                    res.end();
                });
            };
            jeswin();
            

        }

        
       
    });
    

});

http.createServer(app).listen(8081);

