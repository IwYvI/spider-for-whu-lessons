
 function aClass(tData,tText,tValue){
if(aClass.arguments.length<3){
this.aData = 'other';
this.aValue = 'other';
 	this.aText = 'other';	}
else{
this.aData = tData;
this.aValue = tValue;
this.aText = tText;	
}
}



function changeSelectOptions(tdata,aSelect,aClass,tSelected){
	if(changeSelectOptions.arguments.length<3)
		return;
	else if(aClass==null)
		return;
	else{
		for (var i=aSelect.options.length-1; i >=0; i--)
		aSelect.options[i] = null;
		for (var j=0; j<aClass.length; j++){
			if(aClass[j].aData==tdata){
				var aOption =new Option(aClass[j].aText,aClass[j].aValue);
				eval('aSelect.options[aSelect.options.length]=aOption');
               if(aClass[j].aValue == tSelected)aOption.selected = true;
			}
		}
	}
}
function changeAca(va)
{
	changeSelectOptions(va,document.form1.academic,aca);
	changeSub(document.form1.academic.value);
}
function changeSub(va)
{
	changeSelectOptions(va,document.form1.subject,sub);
}
//学部
var col=new Array(
new aClass('0','社会科学学部','2'),
new aClass('0','理学部','3'),
new aClass('0','工学部','4'),
new aClass('0','信息科学学部','5'),
new aClass('0','医学部','6'),
new aClass('0','教务部','7'),
new aClass('0','人文科学学部','1'),
new aClass('End', 'End', 'End'));

//学院
var aca=new Array(
new aClass('1','中国传统文化研究中心','100'),
new aClass('1','校团委','77'),
new aClass('1','校档案馆','75'),
new aClass('1','外国语言文学学院','2'),
new aClass('1','新闻与传播学院','3'),
new aClass('1','大学英语部','55'),
new aClass('1','历史学院','29'),
new aClass('1','文学院','31'),
new aClass('1','艺术学系','32'),
new aClass('1','哲学学院','33'),
new aClass('1','公共文学教学','49'),
new aClass('1','全校','1'),
new aClass('1','研究生院','97'),
new aClass('1','发展研究院','73'),
new aClass('1','职业培训学院','78'),
new aClass('1','教育科学学院','79'),
new aClass('1','就业指导中心','80'),
new aClass('1','校医院','36'),
new aClass('1','七校联办','81'),
new aClass('1','国际交流部','63'),
new aClass('2','马克思主义学院','42'),
new aClass('2','社会学系','61'),
new aClass('2','WTO学院','74'),
new aClass('2','信息管理学院','4'),
new aClass('2','经济与管理学院','5'),
new aClass('2','法学院','6'),
new aClass('2','政治与公共管理学院','34'),
new aClass('2','公共政治教学','58'),
new aClass('2','EMBA','71'),
new aClass('2','MBA','72'),
new aClass('2','大学生心理健康中心','83'),
new aClass('2','军官选拔办公室','60'),
new aClass('2','中国边界研究院','62'),
new aClass('2','高级研究中心','70'),
new aClass('3','留学生教育学院','54'),
new aClass('3','公共数学教学','56'),
new aClass('3','数学与统计学院','10'),
new aClass('3','物理科学与技术学院','11'),
new aClass('3','化学与分子科学学院','12'),
new aClass('3','生命科学学院','13'),
new aClass('3','资源与环境科学学院','14'),
new aClass('3','材料科学与工程学院','15'),
new aClass('3','药学院','27'),
new aClass('3','公共物理教学','57'),
new aClass('3','其它','99'),
new aClass('3','体育部','40'),
new aClass('3','军事教研室','41'),
new aClass('3','图书馆','53'),
new aClass('3','公共化学教学','59'),
new aClass('3','弘毅学堂','65'),
new aClass('4','水利水电学院','16'),
new aClass('4','电气工程学院','17'),
new aClass('4','动力与机械学院','18'),
new aClass('4','城市设计学院','19'),
new aClass('4','土木建筑工程学院','20'),
new aClass('4','学工部','84'),
new aClass('5','印刷与包装系','35'),
new aClass('5','计算机学院','21'),
new aClass('5','电子信息学院','22'),
new aClass('5','遥感信息工程学院','23'),
new aClass('5','测绘学院','24'),
new aClass('5','计算中心','47'),
new aClass('5','国际软件学院','30'),
new aClass('5','继续教育学院','82'),
new aClass('6','医学院','25'),
new aClass('6','口腔医学院','26'),
new aClass('6','公共卫生学院','28'),
new aClass('6','护理学院','37'),
new aClass('6','第一临床学院','38'),
new aClass('6','第二临床学院','39'),
new aClass('7','教务部','0'),
new aClass('7','双学位','76'),
new aClass('End', 'End', 'End'));
//专业
var sub=new Array(
new aClass('0','教务部占教室','jwb'),
new aClass('1','港澳台生','260'),
new aClass('2','英语(七校)','644'),
new aClass('2','翻译','283'),
new aClass('2','日语','127'),
new aClass('2','俄语','124'),
new aClass('2','德语','125'),
new aClass('2','法语','126'),
new aClass('2','法语(七校)','643'),
new aClass('2','英语','123'),
new aClass('3','广告学(七校)','632'),
new aClass('3','新闻学（网络传播方向）','602'),
new aClass('3','新闻学（体育方向）','601'),
new aClass('3','广播电视新闻（播音与主持艺术）','604'),
new aClass('3','新闻学(七校)','627'),
new aClass('3','传播学','650'),
new aClass('3','广告学（广告设计方向）','603'),
new aClass('3','新闻学（插班生）','715'),
new aClass('3','广告学（插班生）','716'),
new aClass('3','新闻传播学类','128'),
new aClass('3','新闻学','130'),
new aClass('3','广播电视新闻学','131'),
new aClass('3','广告学','132'),
new aClass('3','播音与主持艺术','136'),
new aClass('3','广播电视学','380'),
new aClass('4','信息管理与信息系统','220'),
new aClass('4','电子商务','229'),
new aClass('4','编辑出版学','133'),
new aClass('4','档案学','238'),
new aClass('4','数字出版','290'),
new aClass('4','图书馆学','237'),
new aClass('5','工程管理','221'),
new aClass('5','金融工程','113'),
new aClass('5','工商管理','223'),
new aClass('5','市场营销','224'),
new aClass('5','会计学','225'),
new aClass('5','财务管理','226'),
new aClass('5','人力资源管理','227'),
new aClass('5','旅游管理','228'),
new aClass('5','物流管理','230'),
new aClass('5','数理金融试验班金融学','239'),
new aClass('5','数理经济试验班经济学','240'),
new aClass('5','经济学基地班','107'),
new aClass('5','经济学','108'),
new aClass('5','国际经济与贸易','109'),
new aClass('5','财政学','110'),
new aClass('5','金融学','111'),
new aClass('5','保险','112'),
new aClass('5','管理科学与工程类','613'),
new aClass('5','经济学类','614'),
new aClass('5','数理经济与金融试验班金融学','615'),
new aClass('5','物业管理','610'),
new aClass('5','工程管理(七校)','618'),
new aClass('5','工商管理(七校)','619'),
new aClass('5','国际经济与贸易(七校)','620'),
new aClass('5','金融学(七校)','622'),
new aClass('5','经济学(七校)','623'),
new aClass('5','旅游管理(七校)','624'),
new aClass('5','市场营销(七校)','626'),
new aClass('5','会计学(七校)','633'),
new aClass('5','数理经济与金融试验班经济学','634'),
new aClass('5','会计学ACCA教改试验班','640'),
new aClass('5','金融学国际金融试验班','641'),
new aClass('5','国际经济与贸易国际班','739'),
new aClass('5','数理弘毅班','689'),
new aClass('5','工商管理类','222'),
new aClass('6','法语法学','246'),
new aClass('6','中德班','263'),
new aClass('6','法学','114'),
new aClass('6','政法干警第二学士学位班','281'),
new aClass('6','德语法学','274'),
new aClass('6','法学(七校)','617'),
new aClass('10','数学类','616'),
new aClass('10','数学弘毅班','647'),
new aClass('10','金融数学','648'),
new aClass('10','统计学','170'),
new aClass('10','数学与应用数学','142'),
new aClass('10','信息与计算科学','143'),
new aClass('10','数学基地班','141'),
new aClass('11','电子科学与技术','185'),
new aClass('11','物理学类（中法试验班）','272'),
new aClass('11','物理弘毅班','646'),
new aClass('11','微电子科学与工程','291'),
new aClass('11','材料科学与技术','168'),
new aClass('11','物理学基地班','145'),
new aClass('11','物理学','146'),
new aClass('11','应用物理学','147'),
new aClass('11','物理学类','144'),
new aClass('11','微电子科学与工程类（电子科学与技术、微电子科学与工程）','316'),
new aClass('11','物理学基地班（中法班）','314'),
new aClass('12','材料科学与技术试验班应用化学','244'),
new aClass('12','应用化学教改班','245'),
new aClass('12','应用化学(化学生物学)','629'),
new aClass('12','星拱化学拔尖人才培养试验班','285'),
new aClass('12','应用化学','151'),
new aClass('12','化学类','148'),
new aClass('12','化学基地班','149'),
new aClass('12','化学','150'),
new aClass('12','化学弘毅班','639'),
new aClass('13','生物学国际班','262'),
new aClass('13','药学','218'),
new aClass('13','生物科学(七校)','625'),
new aClass('13','重庆医大代培','728'),
new aClass('13','生物技术病毒班','284'),
new aClass('13','生命科学与技术基地班','157'),
new aClass('13','生物科学类','153'),
new aClass('13','生物学基地班','154'),
new aClass('13','生物科学','155'),
new aClass('13','生物技术','156'),
new aClass('13','生科弘毅班','636'),
new aClass('13','生科弘毅国际班','696'),
new aClass('14','测绘工程','198'),
new aClass('14','环境工程','203'),
new aClass('14','土地资源管理','236'),
new aClass('14','地理信息系统（数字地图与空间信息工程）','247'),
new aClass('14','环境科学','169'),
new aClass('14','地理科学','158'),
new aClass('14','资源环境与城乡规划管理','159'),
new aClass('14','地理信息系统','160'),
new aClass('14','地理学基地班','277'),
new aClass('14','自然地理与资源环境','301'),
new aClass('14','人文地理与城乡规划','302'),
new aClass('14','地理信息科学(数字地图与空间信息工程)','303'),
new aClass('14','地理信息科学','300'),
new aClass('14','资源与环境类','306'),
new aClass('14','地理科学类','753'),
new aClass('14','环境科学与工程类','754'),
new aClass('15','test','987'),
new aClass('16','水利类','194'),
new aClass('16','水利水电工程','195'),
new aClass('16','水文与水资源工程','196'),
new aClass('16','港口海岸及治河工程','197'),
new aClass('16','农业水利工程','208'),
new aClass('16','电气工程与自动化（安哥拉）','733'),
new aClass('16','水利类（水利工程）','252'),
new aClass('16','水利类（治河防洪工程）','253'),
new aClass('16','水利类（水文与水资源工程）','254'),
new aClass('16','土木工程（安哥拉）','731'),
new aClass('16','水利类（水力发电工程）','251'),
new aClass('16','港口航道与海岸工程','322'),
new aClass('17','电子信息工程','181'),
new aClass('17','电气工程及其自动化','179'),
new aClass('17','电气工程与自动化','243'),
new aClass('17','电气工程及其自动化（卓越工程师）','757'),
new aClass('18','核工程与核技术','276'),
new aClass('18','能源动力系统及自动化','611'),
new aClass('18','应用化学','152'),
new aClass('18','材料类','171'),
new aClass('18','金属材料工程','172'),
new aClass('18','机械设计制造及其自动化','173'),
new aClass('18','材料成型及控制工程','174'),
new aClass('18','热能与动力工程','177'),
new aClass('18','自动化','180'),
new aClass('18','水质科学与技术','204'),
new aClass('18','能源与动力工程','325'),
new aClass('18','机械类','307'),
new aClass('18','能源动力类','308'),
new aClass('18','自动化类','309'),
new aClass('18','能源化学工程','655'),
new aClass('18','能源与动力工程(卓越工程师)','697'),
new aClass('19','重修班','730'),
new aClass('19','艺术设计','134'),
new aClass('19','工业设计','175'),
new aClass('19','建筑学(五)','189'),
new aClass('19','城市规划(五)','190'),
new aClass('19','设计学类','295'),
new aClass('19','城乡规划','305'),
new aClass('19','产品设计','323'),
new aClass('19','环境设计','324'),
new aClass('19','建筑类','658'),
new aClass('19','建筑学（中英班）','752'),
new aClass('20','土木工程','191'),
new aClass('20','给排水科学与工程','192'),
new aClass('20','水务工程','193'),
new aClass('20','工程力学','207'),
new aClass('20','土木类','296'),
new aClass('20','土木工程(卓越班)','297'),
new aClass('21','计算机弘毅班','642'),
new aClass('21','仿真科学与技术','282'),
new aClass('21','信息安全（网络空间安全）','758'),
new aClass('21','信息安全','167'),
new aClass('21','计算机科学与技术','184'),
new aClass('21','计算机科学与技术(七校)','621'),
new aClass('21','物联网工程','637'),
new aClass('21','计算机类','656'),
new aClass('21','计算机科学与技术(卓越工程师)','690'),
new aClass('22','电波传播与天线','278'),
new aClass('22','电子信息科学类','163'),
new aClass('22','电子信息科学与技术','164'),
new aClass('22','光信息科学与技术','166'),
new aClass('22','光电信息科学与工程','333'),
new aClass('22','测控技术与仪器','176'),
new aClass('22','电气信息类','178'),
new aClass('22','电子信息工程','182'),
new aClass('22','通信工程','183'),
new aClass('22','电子信息类','298'),
new aClass('22','光电信息类','299'),
new aClass('23','地理国情监测','293'),
new aClass('23','地理信息系统','161'),
new aClass('23','电子信息科学与技术','165'),
new aClass('23','信息工程','186'),
new aClass('23','测绘工程','199'),
new aClass('23','遥感科学与技术','201'),
new aClass('23','遥感科学与技术（遥感信息工程）','248'),
new aClass('23','遥感科学与技术（摄影测量）','249'),
new aClass('23','遥感科学与技术（地理信息工程）','250'),
new aClass('24','导航工程','292'),
new aClass('24','测绘工程（信息化测绘实验班）','280'),
new aClass('24','地球物理学','162'),
new aClass('24','测绘工程','200'),
new aClass('24','测绘工程（信息化测绘实验班）','280'),
new aClass('24','测绘工程（卓越工程师班）','653'),
new aClass('24','测绘类','657'),
new aClass('25','临床医学（英文授课六年制）','635'),
new aClass('25','全球健康学','652'),
new aClass('25','预防医学(五)','209'),
new aClass('25','临床医学与医学技术类(五)','210'),
new aClass('25','临床医学(五)','211'),
new aClass('25','临床医学(七)','212'),
new aClass('25','医学检验(五)','213'),
new aClass('25','护理学(五)','217'),
new aClass('25','临床医学（八）','257'),
new aClass('25','临床医学(英文授课)','628'),
new aClass('25','医学检验技术','654'),
new aClass('25','临床医院(5+3)','692'),
new aClass('25','基础医学','751'),
new aClass('26','口腔医学(五)','214'),
new aClass('26','口腔医学(七)','215'),
new aClass('26','口腔医学(八)','258'),
new aClass('26','口腔医学（5+3）','699'),
new aClass('27','生物制药','649'),
new aClass('27','药学','219'),
new aClass('27','药学(七校)','631'),
new aClass('27','药学类','315'),
new aClass('28','全球健康学','294'),
new aClass('28','预防医学（五）','266'),
new aClass('28','公共卫生与预防医学类','304'),
new aClass('29','历史学基地班','137'),
new aClass('29','历史学','138'),
new aClass('29','世界历史','139'),
new aClass('29','考古学','140'),
new aClass('29','人文科学','102'),
new aClass('29','世界史','381'),
new aClass('30','软件工程国际班','287'),
new aClass('30','物联网工程','651'),
new aClass('30','软件工程(二)','187'),
new aClass('30','软件工程','188'),
new aClass('30','空间信息与数字技术','202'),
new aClass('30','软件工程（卓越工程师）','691'),
new aClass('30','软件工程类','659'),
new aClass('30','软件工程（留学生）','310'),
new aClass('31','对外汉语','275'),
new aClass('31','汉语言文学','121'),
new aClass('31','人文科学','101'),
new aClass('31','中国语言文学类','317'),
new aClass('31','汉语国际教育','319'),
new aClass('31','人文科学（历史）','755'),
new aClass('31','人文科学（哲学）','756'),
new aClass('32','戏剧影视文学','135'),
new aClass('32','表演','606'),
new aClass('33','国学弘毅班','679'),
new aClass('33','比较哲学国际班','256'),
new aClass('33','中西比较哲学试验班哲学','241'),
new aClass('33','国学','242'),
new aClass('33','人文科学','103'),
new aClass('33','哲学基地班','104'),
new aClass('33','哲学','105'),
new aClass('33','宗教学','106'),
new aClass('33','心理学','255'),
new aClass('33','现代哲学国际班','326'),
new aClass('34','政治学与行政学','118'),
new aClass('34','外交学','119'),
new aClass('34','公共管理类','231'),
new aClass('34','行政管理','232'),
new aClass('34','公共事业管理','233'),
new aClass('34','公共事业管理(五)','234'),
new aClass('34','劳动与社会保障','235'),
new aClass('34','政治学类','605'),
new aClass('35','包装工程','205'),
new aClass('35','印刷工程','206'),
new aClass('35','包装工程(七校)','630'),
new aClass('37','护理学国际班','288'),
new aClass('37','护理学','216'),
new aClass('37','护理学(五)','264'),
new aClass('38','临床医学（八）','286'),
new aClass('38','临床医学（五）','267'),
new aClass('38','临床医学（七）','268'),
new aClass('39','临床医学（八）','279'),
new aClass('39','临床医学（五）','269'),
new aClass('39','临床医学（七）','270'),
new aClass('39','医学检验','271'),
new aClass('39','医学检验技术','660'),
new aClass('40','体育重修班','259'),
new aClass('41','军事重修班','720'),
new aClass('42','思想政治教育','120'),
new aClass('47','计算机基础重修','725'),
new aClass('54','汉语言','122'),
new aClass('55','公共英语','904'),
new aClass('55','全校英语快班','901'),
new aClass('55','全校英语小语种','902'),
new aClass('55','全校英语特快班','903'),
new aClass('55','英语重修班','719'),
new aClass('55','插班生英语','905'),
new aClass('56','高数重修班','717'),
new aClass('57','物理重修班','718'),
new aClass('58','政治重修班','727'),
new aClass('60','国防生','261'),
new aClass('61','社会学类','115'),
new aClass('61','社会学','116'),
new aClass('61','社会工作','117'),
new aClass('62','法学','273'),
new aClass('65','理科试验班类','930'),
new aClass('71','EMBA学位班','701'),
new aClass('74','法语（WTO）','638'),
new aClass('74','经济学（WTO）','703'),
new aClass('74','工商管理（WTO）','702'),
new aClass('74','中法国际班(法语)','612'),
new aClass('74','法学（WTO）','721'),
new aClass('76','会计学（双学位）','726'),
new aClass('76','英语（双学位）','734'),
new aClass('76','法语（双学位）','732'),
new aClass('76','广告学（双学位）','724'),
new aClass('76','法学（双学位）','704'),
new aClass('76','工程管理（双学位）','705'),
new aClass('76','工商管理（双学位）','706'),
new aClass('76','国际经济与贸易（双学位）','707'),
new aClass('76','计算机科学与技术（双学位）','708'),
new aClass('76','金融学（双学位）','709'),
new aClass('76','经济学（双学位）','710'),
new aClass('76','旅游管理（双学位）','711'),
new aClass('76','生物科学（双学位）','712'),
new aClass('76','市场营销（双学位）','713'),
new aClass('76','新闻学（双学位）','714'),
new aClass('76','药学（双学位）','722'),
new aClass('76','包装工程（双学位）','723'),
new aClass('97','研究生（三区）','998'),
new aClass('97','研究生（一区）','997'),
new aClass('97','研究生（二区）','y01'),
new aClass('99','其它','906'),
new aClass('End', 'End', 'End'));
//年级
var grade=new Array(
new aClass('0','2009','2009'),
new aClass('0','2010','2010'),
new aClass('0','2011','2011'),
new aClass('0','2012','2012'),
new aClass('0','2013','2013'),
new aClass('0','2014','2014'),
new aClass('0','2015','2015'),
new aClass('0','2016','2016'),
new aClass('End', 'End', 'End'));
function initOptions(){
	if($("select[name=college]")[0].options.length != 0)return;
	//填充学部option
	changeSelectOptions("0",$("select[name=college]")[0],col);
	changeAca($("select[name=college]")[0].value);
	//填充年级option
	changeSelectOptions("0",$("select[name=grade]")[0],grade);
}
function doCheck(form)
{
	
}
function writeInfo(dcol, daca, dsub, dgrade)
{
	if(dcol == "null")
	{
		return;
	}
	var str = " ";
	var j;
	for (j=0; j<col.length; j++){
		if(col[j].aValue==dcol){
			str += col[j].aText+"&gt;&gt;"
			break;
		}
	}
	for (j=0; j<aca.length; j++){
		if(aca[j].aValue==daca){
			str += aca[j].aText+"&gt;&gt;"
			break;
		}
	}
	for (j=0; j<sub.length; j++){
		if(sub[j].aValue==dsub){
			str += sub[j].aText+"&gt;&gt;"
			break;
		}
	}
	str += dgrade+"级";
	document.write(str);
 	changeSelectOptions("0",form1.college,col,dcol);
	changeSelectOptions(form1.college.value,document.form1.academic,aca,daca);
	changeSelectOptions(form1.academic.value,document.form1.subject,sub,dsub);
	//填充年级option
	changeSelectOptions("0",form1.grade,grade,dgrade);
}
//document.body.onload = initOptions;



module.exports = {
	sub: sub,
	grade: grade
};