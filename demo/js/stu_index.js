$(function() {
	var xyt_jlist_url = 'http://xyt.boryi.com/SchoolMatesSystem/JobFairView/getallEnterPosition';
	var xyt_flist_url = 'http://xyt.boryi.com/SchoolMatesSystem/JobFairView/getallEnterJofai';
	
	Vue.prototype.$industry = industry;
	Vue.prototype.$fun_a = fun_a;
	Vue.prototype.$cmptyp_a = cmptyp_a;
	Vue.prototype.$edu_a = edu_a;
	Vue.prototype.$ChineseDistricts = ChineseDistricts;

	var app = new Vue({
		el: '#joblist',
		data: {
			top: 1,
	      	bottom: 1,
	      	latestloaded :0,
			code: 0,
			currentJobPageNumber:1,
			maxJobPageNumber:1,
			currentJobFairPageNumber:1,
			pages: {},
			jobs: [],
			jobfairs: []
		},
		methods:{
			getjob:function(pageNumber, more){
				// POST /someUrl
				this.$http.post(xyt_jlist_url, 'cuurentPage=' + pageNumber + '&pagesize=5&userType=123&guid=&userId=0',
					{headers :{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}}
   					).then((response) => {
					// success callback
					if (response.data) {
						this.code = response.data.code; 
						this.pages = response.data.datapage;
						this.currentJobPageNumber = response.data.datapage.currentPage;
						this.maxJobPageNumber = response.data.datapage.totalPage;

						if (more) {
							var results = this.substrToJson(response.data.data) || [];
							for (var i = 0; i < results.length; i++) {
								this.jobs.push(results[i]);
							}
						} else {
							this.jobs = this.substrToJson(response.data.data);	
						}
						this.bottom = this.jobs.length;
					}
					
				}, (response) => {
					// error callback
					alert('数据插入失败，请稍后重试')
				});
			},
			getjobfair:function(pageNumber) {
				var fd = new FormData();
				// append string
				fd.append('cuurentPage', pageNumber);
				fd.append('pagesize', '5');
				fd.append('userType', '123');
				fd.append('guid', '');
				fd.append('userId', 0);
				// POST /someUrl
				var headers = {'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'};
				this.$http.post(xyt_flist_url, fd, headers).then((response) => {
					// success callback
					this.code = response.data.code; 
					this.pages = response.data.datapage;
					this.jobfairs = this.substrToJson(response.data.data);

					console.log(this.jobfairs);
				}, (response) => {
					// error callback
					alert('数据插入失败，请稍后重试')
				});

			},
			handleIndustry: function(industryId){
				if (industryId != null) {
			        var jolisIndIdfirst = parseInt((industryId + "").substring(0, 4) + "000000");
			        return fun_a[1000000000][jolisIndIdfirst];
			    }
			},
			handleCompanyType: function(typeId){
				if (typeId != null) {
			        return cmptyp_a[typeId];
			    }
			},
			handleEducationType: function(eduId){
				if (eduId != null) {
			        return edu_a[eduId];
			    }
			},
			checkSalary: function(salary){
			    if (salary == -1) {
			        return "";
			    } else {
			        var sly = salary * 0.001 + "";
			        if ((/\./g).test(sly)) {
			        	var slys = sly.split(".");
			            if (sly.split(".")[1].length >= 2) {
			                sly = slys[0] + "." + slys[1].substring(0, 2);
			            } else {
			                sly = slys[0] + "." + slys[1] + "0";
			            }
			        } else {
			            sly = sly + "." + "00";
			        }
			        return sly + "K";
			    }
			},
			handleSalary: function(low, high){
				var salaryLow = this.checkSalary(low);
			    var salaryHigh = this.checkSalary(high);

			    if (low == -1 && high == -1) {
			        return "面议";
			    } else {
			        return salaryLow + " - " + salaryHigh;
			    }
			},
			handleLocation: function(locationId){
				console.log(locationId);
				var basicLoc = "工作地不限";
				if (locationId) {
			        //所在地
			        var province100 = parseInt((locationId + "").substring(0, 3) + "0000000000000");
			        basicLoc = ChineseDistricts[1000000000000000][province100];
			        var city10 = (locationId + "").substring(3, 5);
			        var district10 = (locationId + "").substring(5, 7);

			        if (city10 != "00") {
			            var city10 = parseInt((locationId + "").substring(0, 5) + "00000000000");
			            basicLoc += "-" + ChineseDistricts[province100][city10];
			        }
			        if (district10 != "00") {
			            basicLoc += "-" + ChineseDistricts[city10][locationId];
			        }
			    }
		        return basicLoc;
			},
			handlePostDate:function(date, dateOnly){
			 	var d = new Date(date);
			 	var str = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
			 	if(dateOnly == 0) {
			 		str += ' ' + d.getHours() + ':' + d.getMinutes();
			 	}
			 	return str;
			},
			substrToJson: function(responseJson){
				var output = JSON.stringify(responseJson)
					.replace(/\"\{/g,"{")
					.replace(/\}\"/g,"}")
					.replace(/\\\"/g,"\"");
				console.log('This is the latest');
				console.log(output);
				var obj = [];
				try {
					obj = JSON.parse(output);	
					console.log(obj);
				} catch(e){
					console.log(e);
				}
				return obj;
			},

			refresh: function (done) {
				// 下拉刷新的时候，若要保留之前加载的记录，只更新增量，
				// 则需要后端提供接口，前端将当前最新一条记录的id发送回去，
				// 后端返回所有比该记录后插入的结果集
				// 这里只是做简单刷新，获取最新的5个结果
				app.getjob(1, false);
				done();
	      	},
	      	infinite: function (done) {
				app.getjob(++this.currentJobPageNumber, true);
				done(true);
/*
				if (this.currentJobPageNumber >= this.totalPage){
					
				} else {
					done();
				}
*/
	      	}
		}
	})

	app.getjob(1);

	//app.getjobfair(1);
});