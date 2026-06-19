<template>
  <div class="page-section">
    <div class="home-card">
      <div class="card-header"><span class="card-title"><span class="title-dot"></span>档案寄达查询</span></div>
      <div class="card-body">
        <el-descriptions :column="2" border size="default">
          <el-descriptions-item label="档案寄出单位">XX大学学生工作处</el-descriptions-item>
          <el-descriptions-item label="寄出日期">2023-07-01</el-descriptions-item>
          <el-descriptions-item label="快递单号">SF1234567890123</el-descriptions-item>
          <el-descriptions-item label="快递公司">顺丰速运</el-descriptions-item>
          <el-descriptions-item label="预计到达日期">2023-07-05</el-descriptions-item>
          <el-descriptions-item label="签收状态"><el-tag type="success" round>已签收</el-tag></el-descriptions-item>
          <el-descriptions-item label="签收人">研究生院档案室</el-descriptions-item>
          <el-descriptions-item label="签收日期">2023-07-04</el-descriptions-item>
          <el-descriptions-item label="备注" :span="2">档案已完整到达，材料齐全</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script setup></script>
<style scoped>
.page-section { max-width: 900px; }
.home-card { background: #fff;  overflow: hidden; }
.card-header { padding: 15px 20px; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
.card-title { font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px; }
.title-dot { width: 10px; height: 10px; border-radius: 50%; background: #153D97; }
.card-body { padding: 20px; }
</style>
