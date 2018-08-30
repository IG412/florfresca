var	ejs         = require('ejs'),
	fs          = require('fs'),
	tls 		= require('tls'),
	nodemailer  = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    auth: {
      user: 'noreply@lacamarasinalma.com',
      pass: 'VideoPlanMx#'
    }
});

module.exports = {
	get : function (path,data){
			if(path){
				var File = fs.readFileSync(path);
				var html = ejs.render(File.toString(),data);
				return html;
			}else{
				return 0;
			}
		},
	send: function (){
		return transporter;
	}
}