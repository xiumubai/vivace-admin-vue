<template>
  <div class="card-list">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-first">总销售额</div>
          <div class="card-second">126560</div>
          <div class="card-third">周同比 12% 日环比 11%</div>
          <div class="card-forth">
            <span class="card-forth-title">日均销售额</span>
            <span class="card-forth-num">￥12423</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-first">访问额</div>
          <div class="card-second">8846</div>
          <div class="card-third">
            <img :src="image2" alt="" srcset="" />
          </div>
          <div class="card-forth">
            <span class="card-forth-title">日均销售额</span>
            <span class="card-forth-num">￥12423</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-first">支付笔数</div>
          <div class="card-second">6560</div>
          <div class="card-third">
            <img :src="image3" alt="" srcset="" />
          </div>
          <div class="card-forth">
            <span class="card-forth-title">转换率</span>
            <span class="card-forth-num">60%</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-first">用户转化率率</div>
          <div class="card-second">78%</div>
          <div class="card-third">
            <img :src="image4" alt="" srcset="" />
          </div>
          <div class="card-forth">
            <span class="card-forth-title">周同比</span>
            <span class="card-forth-num">
              <el-icon class="caret-top"><CaretTop /></el-icon>
              12%
            </span>
            <span class="card-forth-title" style="margin-left: 10px">
              日环比
            </span>
            <span class="card-forth-num">
              <el-icon class="caret-bottom"><CaretBottom /></el-icon>
            </span>
            11%
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import image2 from '@/assets/images/statics-top-two.png'
import image3 from '@/assets/images/statics-top-three.png'
import image4 from '@/assets/images/statics-top-four.png'
</script>

<style lang="scss" scoped>
.card-first {
  color: rgba(0, 0, 0, 0.427);
  font-size: 14px;
  padding-bottom: 5px;
}
.card-second {
  color: rgba(0, 0, 0, 0.847);
  font-size: 30px;
}
.card-third {
  color: rgba(0, 0, 0, 0.427);
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.111);
}
.card-forth {
  padding-top: 10px;
  color: rgba(0, 0, 0, 0.666);
  white-space: nowrap;
  .card-forth-title {
    display: inline-block;
    margin-right: 15px;
  }
}
img {
  width: 100%;
  max-height: 16px;
  display: block;
}
.caret-top {
  color: green;
}
.caret-bottom {
  color: red;
}

.card-list .el-card :deep(.el-card__body) {
  padding-bottom: 10px;
}
</style>
