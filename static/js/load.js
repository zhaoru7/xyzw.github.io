var time_delay=null;
$(document).ready(function(){
	$(".Tab").Tab_()	
	$("#ZhiYe").ZhiYe()
	$.fn.hovers();
})


//悬停效果
$.fn.hovers=function(){
	

	$(".item").append("<div class='bg_zz'></div>")
	$(".item").hover_animate(
				{
				  aniobj:
				  [
					  [
						  ".pic",					//应用对象
						  "",//初始CSS
						  "right:30%;",		//mouseenter动画CSS
						  "right:0;",			//mouseleave动画css
						  "{duration:600,easing:'easeInOutCirc'}",					//mouseenter 时间
						  "600"						//mouseleave 时间
					  ],
					  
					  [
						  ".bg_zz",					//应用对象
						  "opacity:0;",//初始CSS
						  "width:80%;left:20%;opacity:1;",		//mouseenter动画CSS
						  "left:0;width:0;opacity:0;",			//mouseleave动画css
						  "300",					//mouseenter 时间
						  "300"						//mouseleave 时间
					  ],
					  
					  [
						  ".text",					//应用对象
						  "",//初始CSS
						  "left:2rem;",		//mouseenter动画CSS
						  "left:0px;",			//mouseleave动画css
						  "{duration:400,easing:'easeInOutCirc'}",					//mouseenter 时间
						  "600"						//mouseleave 时间
					  ]
				  ],
				  set_class:"hover_item"
				}
				
			)

			

	
}


	
//职业切换
$.fn.ZhiYe=function(){
	var obj=$(this)
	if (obj.length==0) return false;
	
	
	var navobj=obj.find(".ZhiYe_Nav")
	var boxobj=obj.find(".ZhiYe_nr")
	if (navobj.find("li.change").length==0) 
	{
		navobj.find("li:first").addClass("change");		
		var index=$(this).index();
	}
	
	obj.find(".ZhiYe_nr:eq("+navobj.find("li.change").index()+")").fadeIn()
	
	navobj.find("li").bind("click",function(){
		
		//已加载的
		var index2=$(this).siblings(".change").index()
		var obj002=obj.find(".ZhiYe_nr:eq("+index2+")")
		var objleft2=obj002.find(".zhiyebox")
		var objright2=obj002.find(".zhiyePic")
		
		//等待加载的
		$(this).addClass("change").siblings().removeClass("change");
		var index=$(this).index();
		var obj001=obj.find(".ZhiYe_nr:eq("+index+")")
		var objleft=obj001.find(".zhiyebox")
		var objright=obj001.find(".zhiyePic")
		
		
			  var outplay=[
				function(){objleft2.animate({"opacity":"0","left":"-1.42rem"},200,plays)},
				function()
				{objright2.animate({"opacity":"0","right":"-1.25rem"},200,plays)}
				,
				function(){
				obj002.css("display","none")		
				obj001.css("display","block")		
				plays();
				},
				function(){
					objleft.css({"left":"-1.42rem","opacity":0}).stop().animate({"opacity":1,"left":"0rem"},{ duration:500,easing:'easeInOutCirc' },plays())
				}
				,function(){
					objright.css({"right":"-1.25rem","opacity":0}).stop().animate({"opacity":1,"right":"-0.5rem"},{ duration:500,easing:'easeInOutCirc' },plays())
				}
				
			 ]
				
		
		

			obj.queue("playlist01",outplay)	
			var plays=function(){obj.dequeue("playlist01")}
			plays()
			
		
	})
	
}

	
//选项卡滑动
	$.fn.Tab_=function(){
		var obj=$(this)
		if (obj.length==0) return false;
		var times=300
		obj.each(function(index, element) {
			var tab_obj=$(this)
			var li=tab_obj.find("li.change");
			
			tab_obj.find("li:last-child").after("<span class='lines'></span>")
			if (li.length>0)
			{
				obj.css("position","relative");
				var width=li.outerWidth();
				var lineobj=tab_obj.find(".lines")
				lineobj.css("width",width);
				
				tab_obj.find("li").bind("mouseenter",function(){
						var left=$(this).position().left
						lineobj.stop(true,false).animate({"left":left},times)
				}).bind("mouseleave",function(){
						if (!$(this).is(".change"))
						{
						var left=$(this).siblings(".change").css("position","static").position().left;
						 lineobj.stop(true,false).animate({"left":left},times)
						}
						
				})
			}
		});	
	}
//选项卡切换
		$.fn.Tab=function(config){
			var self=$(this);
			var select_=0;
			var classname=config.labselect.replace(".","")
			if (self.length==0) return false;
			if (self.find(config.lilab).length==0) return false;
			
			
			self.each(function(index, element) {
							
				self=$(this);
						
						if (self.find(config.labselect).length==0) 
						{self.find(config.lilab+":eq(0)").addClass(classname);}
						self.find(config.lilab).each(function(index, element) {
							if (!$(this).is(config.labselect))
							{
								self.siblings(config.Tabname+":eq("+index+")").hide();
							}
						});
						
						self.find(config.lilab).bind(config.labaction+".action",function(){
							
							var index=$(this).index();
							if(self.siblings(config.Tabname+":visible").is(":animated")){ 
							return false;
							
							}

							
							if ($(this).is(config.labselect)) return false;
							var index2=$(this).siblings(config.labselect).index()
							$(this).addClass(classname).siblings().removeClass(classname);
							
							config.animate(index,index2,config.animatename)
							return config.labaction=="click"?   false :  true;
						})
						
						config.animate=function(index,index2,active){
							
							switch (active)
							{
								case "fade":
									self.siblings(config.Tabname+":visible").hide();
									self.siblings(config.Tabname+":eq("+index+")").fadeIn(config.animateTime);
								break;
								case "scroll_x":
									self.parent().css({"position":"relative","overflow":"hidden"});
									var selfs=self.siblings(config.Tabname+":visible")
									var dr="100%",dr2="100%"
									if (index2>index)
									{
										dr="100%";
										dr2="-100%"
									}
									else
									{
										dr="-100%";
										dr2="100%"
									}
									var top=selfs.position().top
									
									
									if (config.mode=="delay")		
									{
									//当前渐隐
									selfs
									.css({"position":"relative","width":"100%"})
									.stop(true,false)
									.animate({"left":dr,"opacity":0},config.animateTime,
												function(){
													 $(this).css({"position":"static","left":"auto","opacity":1,"display":"none"}
												)}
											)
									setTimeout(function(){
												self.siblings(config.Tabname+":eq("+index+")").css({"position":"relative","left":dr2,"display":"block","opacity":0})
												.stop(true,false)
												.animate({"left":0,"opacity":1},config.animateTime
												,function(){
														$(this).css({"top":0,"position":"static"})	
														
												})
									},config.animateTime)		
								
									}
									
									else
									{
										
											selfs
											.css({"position":"absolute","width":"100%","left":selfs.position().left,"top":selfs.position().top})
											.stop(true,false)
											.animate({"left":dr,"opacity":0},config.animateTime,
												function(){
													 $(this).css({"position":"relative","top":"auto","left":"auto","opacity":1,"display":"none"}
												)}
											)
									
									
												self.siblings(config.Tabname+":eq("+index+")").css({"position":"relative","left":dr2,"display":"block","opacity":0})
												.stop(true,false)
												.animate({"left":0,"opacity":1},config.animateTime
												,function(){
														$(this).css({"top":0,"position":"relative"})	
														
												})
									}
								break;
								
								
								case "none":
									self.siblings(config.Tabname+":visible").hide();
									self.siblings(config.Tabname+":eq("+index+")").show();
								break;	
								
							}
							
							
						}


            });

		}
function scroll(obj) {
	var tmp = (obj.scrollLeft)++;
	//当滚动条到达右边顶端时
	if (obj.scrollLeft==tmp) obj.innerHTML += obj.innerHTML;
	//当滚动条滚动了初始内容的宽度时滚动条回到最左端
	if (obj.scrollLeft>=obj.firstChild.offsetWidth) obj.scrollLeft=0;
}


$.fn.hover_animate=function(obj){var time_delay=null,runlist=[],runlist_end=[],create_var=[],set_var=[],self=$(this);if(self.length===0||obj.aniobj.length===0){return}if(obj.set_class===""||typeof(obj.set_class)==="undefined"){$.extend(obj,{set_class:"hover"})}if(typeof(obj.delaytime)!=="number"||typeof(obj.delaytime)==="undefined"){$.extend(obj,{delaytime:100})}var fn={csschange:function(val){val=$.trim(val);if(val===""){return""}if(val.indexOf("{")<0||val.indexOf("}")<0){val=$.trim(val);var last_fh=val.lastIndexOf(";");if(last_fh+1===val.length){val=val.substring(0,last_fh);val="{'"+val.replace(/\:/g,"':'").replace(/\;/g,"','")+"'}"}else{val="{'"+val.replace(/\:/g,"':'").replace(/\;/g,"','")+"'}"}}return $.trim(val)}};$.each(obj.aniobj,function(index,val){if(val.length<6){return}var setobj=val[0],setobj_=setobj.replace(/\.|\ |\>/g,""),animate_css=fn.csschange(val[1]),animate_start=fn.csschange(val[2]),animate_end=fn.csschange(val[3]),animate_easing=val[4],animate_easing2=val[5],animate_delay=val[6],animate_delay2=val[7],run="",run_end="";if(typeof(animate_delay)==="undefined"){animate_delay=0}if(typeof(animate_delay2)==="undefined"){animate_delay2=0}if(animate_css!==""){animate_css_=".css("+animate_css+")"}else{animate_css_=""}if(setobj===""){return}create_var.push("var _"+setobj_+"");if(setobj==="self"){set_var.push("_"+setobj_+"=[self]")}else{set_var.push("_"+setobj_+'=[self].find("'+setobj+'")')}if(animate_start!==""){run="_"+setobj_+animate_css_+".stop(true,false).delay("+animate_delay+").animate("+animate_start+","+animate_easing+")"}else{run="_"+setobj_+animate_css}if(animate_css_!==""||animate_start!==""){runlist.push(run)}if(animate_end!==""){run_end="_"+setobj_+".stop(true,false).delay("+animate_delay2+").animate("+animate_end+","+animate_easing2+")";runlist_end.push(run_end)}});var selfobj=null;self.off(".s");$.each(create_var,function(index,val){eval(val)});self.on("mouseenter.s",function(){selfobj=$(this);$.each(set_var,function(index,val){eval(val.replace("[self]","selfobj"))});clearTimeout(time_delay);time_delay=setTimeout(function(){if(!selfobj.is(":animated")){selfobj.addClass(obj.set_class);$.each(runlist,function(index,val){eval(val)})}},obj.delaytime)}).on("mouseleave.s",function(){clearTimeout(time_delay);if(selfobj.is("."+obj.set_class)){$.each(runlist_end,function(index,val){eval(val)});selfobj.removeClass(obj.set_class)}})};
