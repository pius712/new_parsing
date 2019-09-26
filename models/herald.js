const request = require('request');
const fs = require('fs');
const parseString = require('xml2js').parseString;
const date = new Date();
module.exports = ()=>{
    request.get('http://biz.heraldcorp.com/common/rss_xml.php?ct=0',(err,res,body)=>{
        let arr = {};   
        let arr2 = {};
        if(err){
            return console.error(err);
        }
        
        parseString(body, {trim:true} ,(err,result)=>{
            if(err){
                console.error(err);
            }
            arr = result.rss.channel[0].item;
        });
    
        arr2 = arr.map((item,index)=>(
 `
${index+1} 제목 : ${item.title}  
요약: ${item.description}`
                ));
    
     
        fs.writeFile(`./${date.getMonth()+1}월${date.getDate()}일헤럴드.txt`, arr2, 'utf8',function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        });  
    });
}