const Dom = require('xmldom').DOMParser;
const select = require('xpath.js');
const xml = `<?xml version="1.0" encoding="UTF-8"?><ns0:contentRepRecordPropertyRequest xmlns:ns0="urn:aucklandcouncil.govt.nz:service:basis:archivelink"><header><archLinkPutHeader><httpPutFunction>create</httpPutFunction><contRep>ZE</contRep><compId>Nothcote (SulphurBeach)_Locker 55 - P Macedo.pdf</compId><docId>005056BC64E01ED897C5603C7E8FD423</docId><pVersion>0046</pVersion><contentLength>673304</contentLength><contentType>application/pdf</contentType><charset></charset><version></version><docProt></docProt><accessMode></accessMode><expiration></expiration><secKey>10.178.102.232</secKey><authId></authId><httpbody>WkUtMDA1MDU2QkM2NEUwMUVEODk3QzU2MDNDN0U4RkQ0MjM=</httpbody><filename>\\IDERMFILP01\ArchiveLink_Transient\ZE-005056BC64E01ED897C5603C7E8FD423.pdf</filename></archLinkPutHeader><archLinkBusObjectType>BUS1505</archLinkBusObjectType></header><Item><fieldName>ATTACHER_USER_NAME</fieldName><fieldValue>Gia Roman</fieldValue></Item><Item><fieldName>ATTACHER_USER_ID</fieldName><fieldValue>L020712</fieldValue></Item><Item><fieldName>ATTACHMENT_DATE</fieldName><fieldValue>20180523</fieldValue></Item><Item><fieldName>SAP_BO_TYPE</fieldName><fieldValue>BUS1505</fieldValue></Item><Item><fieldName>SAP_BO_ID</fieldName><fieldValue>10000000000108148</fieldValue></Item></ns0:contentRepRecordPropertyRequest>`;
//const doc = new Dom().parseFromString(xml);
//const nodes = select(doc, '//order');

var orderIds
//orderIds = nodes.map((node) => node.getAttribute('order_id'));
//orderIds = nodes.map((node) => node.getElementById('order'));
//orderIds = nodes;

//orderIds = nodes.map((node) => node.getElementsByTagName("order")[0]);
//orderIds = doc.getElementsByTagName("order")[0];
//orderIds = orderIds.childNodes[0];
//orderIds = orderIds.nodeValue;

//orderIds = select(doc, '//docId/text()')[0].data;

exports.parseXML = function(xml, xpath1, xpath2, xpath3, callback){
	
	var doc = new Dom().parseFromString(xml);
	
	var docID =  select(doc, xpath1)[0].data;
	var coRep =  select(doc, xpath2)[0].data;
	var coTyp =  select(doc, xpath3)[0].data;
	
	callback(`${coRep}-${docID} - ${coTyp}`);

}

//console.log(orderIds);