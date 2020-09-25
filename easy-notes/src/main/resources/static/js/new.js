$(document).ready(
		function() {
			$("#noteNewForm").submit(function(event) {
				event.preventDefault();
				add();
			});

			function add() {

				var formData = {
					title : $("#titleNew").val(),
					content : $("#contentNew").val(),
					date : $("#dateNew").val()
				}

				$.ajax({
					type : "POST",
					contentType : "application/json",
					url : "save",
					data : JSON.stringify(formData),
					dataType : 'json',
					success : function(result) {
						    var created = new Date(result.createdAt);
                            var updated = new Date(result.updatedAt);
                            var dayU = updated.getDate();
                            var monthU = updated.getMonth()+1;
                            var yearU = updated.getFullYear();
                            var hourU = updated.getHours();
                            var minuteU = updated.getMinutes();
                            var secondU = updated.getSeconds();
                            if(dayU < 10) {
                                dayU = '0' + dayU;
                            }
                            if(monthU < 10) {
                                monthU = '0' + monthU;
                            }
                            if(hourU < 10) {
                                hourU = '0' + hourU;
                            }
                            if(minuteU < 10) {
                                minuteU = '0' + minuteU;
                            }
                            if(secondU < 10) {
                                secondU = '0' + secondU;
                            }
                            updated = yearU + '-' + monthU + '-' + dayU + ' ' + hourU + ":" + minuteU + ":" + secondU + ".0";

                            var dayC = created.getDate();
                            var monthC = created.getMonth()+1;
                            var yearC = created.getFullYear();
                            var hourC = created.getHours();
                            var minuteC = created.getMinutes();
                            var secondC = created.getSeconds();
                            if(dayC < 10) {
                                dayC = '0' + dayC;
                            }
                            if(monthC < 10) {
                                monthC = '0' + monthC;
                            }
                            if(hourC < 10) {
                                hourC = '0' + hourC;
                            }
                            if(minuteC < 10) {
                                minuteC = '0' + minuteC;
                            }
                            if(secondC < 10) {
                                secondC = '0' + secondC;
                            }
                            created = yearC + '-' + monthC + '-' + dayC + ' ' + hourC + ":" + minuteC + ":" + secondC + ".0";
						    $("#tableNote").DataTable().row.add([
						        result.id,
						        result.title,
						        result.content,
						        result.date,
						        created,
						        updated,
						        "<a href=\"delete/" + result.id + "\" class=\"btn btn-danger delBtn\" >Delete</a>",
						        "<a href=\"findOne/" + result.id + "\" class=\"btn btn-primary eBtn\" >Edit</a>"
						    ]).draw( false );
							alert("Add Success!");
						console.log(result.data);
					},
					error : function(e) {
						alert("Add Error!")
						console.log("ERROR: ", e);
					}
				});
			}
		})