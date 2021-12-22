<template>
	<view>
		<uni-list>
			   <uni-list-item>
			        <!-- 自定义 header -->
			        <view slot="header" class="header">
						收货人
					</view>
			        <!-- 自定义 body -->
			        <text slot="body" class="body">
						<input type="text" value="于珠珠" />
					</text>
			    </uni-list-item>
				<uni-list-item>
				     <!-- 自定义 header -->
				     <view slot="header" class="header">
						手机号码
					</view>
				     <!-- 自定义 body -->
				     <text slot="body" class="body">
						<input type="text" value="于珠珠" />
					</text>
				 </uni-list-item>
				 <uni-list-item direction="row">
				      <!-- 自定义 header -->
				      <view slot="header" class="header">
						所在地区
					  </view>
				      <!-- 自定义 body -->
				      <text slot="body" class="body">
							<input type="text" value="于珠珠" />
						</text>
						<template slot="footer">
							<image style="width: 42rpx;height: 42rpx;" src="./asset/address.svg"></image>
						</template>
				  </uni-list-item>
				  <uni-list-item>
				       <!-- 自定义 header -->
				       <view slot="header" class="header">
							详细地址
						</view>
				       <!-- 自定义 body -->
				       <text slot="body" class="body">
							<textarea class="address" type="text" value="于珠珠" />
				  		</text>
					
				   </uni-list-item>
		</uni-list>
		<uni-list style="margin-top: 30rpx;border: none;">
			<uni-list-item :border="false" title="设置为默认地址">
				<template slot="footer">
					<switch :checked="true" color="rgba(65, 171, 133, 1)" style="transform: scale(0.7,0.7);"/>
				</template>
			</uni-list-item>
			</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.header{
		width: 140rpx;
		color: rgba(80, 80, 80, 1);
		font-size: 28rpx;
		align-items: center;
	}
	.body{
		color: rgba(80, 80, 80, 1);
		font-size: 28px;
		text-align: left;
		font-weight: bold;
	}
	.address{
		max-width: 400rpx;
		height: 140rpx;
		max-height: 280rpx;
	}
</style>
