$(document).ready(function() {

	$('#clone').on('click', function() {

		var num = $('input#people').val();
		
		if (num < 4 || num > 24) {
			$('.ui.basic.modal').modal('setting', 'closable', false).modal('show');
		} else {
			$('#step1').remove();
			var str1 = '<div id="ctn" class="ui container">	<form class="ui form">'
			var str3 = '<div class="field">			<div class="ui checkbox">				<input type="checkbox" tabindex="0" class="hidden">				<label>我已阅读并接受春骑报名条款。</label>			</div>		</div>		<button class="ui button" type="submit">提交</button>	</form></div>'
			for (var i = 1; i <= num; i++) {
				var str2 = '<div class="ui segment">		<p class="ui header">报名者' + i + '信息表</p>		<div class="field">			<label>姓名</label>			<input type="text" name="name" placeholder="姓名">		</div>		<div class="field">			<label>性别</label>			<div class="inline fields">			<div class="field">				<div class="ui radio checkbox">					<input type="radio" name="sex" tabindex="0" class="hidden">					<label>男</label>				</div>			</div>			<div class="field">				<div class="ui radio checkbox">					<input type="radio" name="sex" tabindex="1" class="hidden">					<label>女</label>				</div>			</div>			</div>		</div>		<div class="field">			<label>身份证号</label>			<input type="text" name="id-card" placeholder="身份证号">		</div>		<div class="field">			<label>手机号</label>			<input type="text" name="phone" placeholder="手机号">		</div>		<div class="field">			<label>紧急联系人姓名</label>			<input type="text" name="sos-name" placeholder="紧急联系人姓名">		</div>		<div class="field">			<label>紧急联系人手机号</label>			<input type="text" name="sos-phone" placeholder="紧急联系人手机号">		</div>		<div class="field">			<label>衣服尺码</label>			<div class="inline fields">			<div class="field">				<div class="ui radio checkbox">					<input type="radio" name="shit-size" tabindex="0" class="hidden">					<label>S</label>				</div>			</div>			<div class="field">				<div class="ui radio checkbox">					<input type="radio" name="shit-size" tabindex="1" class="hidden">					<label>M</label>				</div>			</div>			<div class="field">				<div class="ui radio checkbox">					<input type="radio" name="shit-size" tabindex="2" class="hidden">					<label>L</label>				</div>			</div>			<div class="field">				<div class="ui radio checkbox">					<input type="radio" name="shit-size" tabindex="3" class="hidden">					<label>XL</label>				</div>			</div>			<div class="field">				<div class="ui radio checkbox">					<input type="radio" name="shit-size" tabindex="3" class="hidden">					<label>XXL</label>				</div>			</div>			<div class="field">				<div class="ui radio checkbox">					<input type="radio" name="shit-size" tabindex="3" class="hidden">					<label>XXXL</label>				</div>			</div>			</div>		</div>		<div class="field">			<label>兴趣爱好(*可选)</label>			<input type="text" name="like" placeholder="兴趣爱好">		</div>		<div class="field">			<label>职业(*可选)</label>			<input type="text" name="work" placeholder="职业">		</div>		</div>'
				str1 += str2
			}
			str1 += str3
			$('body').append(str1);
		}
	})
});
