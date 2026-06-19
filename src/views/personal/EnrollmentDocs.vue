<template>
  <div class="page-section">
    <div class="home-card">
      <div class="card-header"><span class="card-title"><span class="title-dot"></span>入学证件</span></div>
      <div class="card-body">
        <el-table :data="docs" stripe size="default">
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="name" label="证件名称" min-width="180" />
          <el-table-column prop="type" label="证件类型" width="140" />
          <el-table-column label="上传状态" width="120">
            <template #default="{ row }"><el-tag :type="row.uploaded ? 'success' : 'warning'" size="small" round>{{ row.uploaded ? '已上传' : '待上传' }}</el-tag></template>
          </el-table-column>
          <el-table-column label="审核状态" width="120">
            <template #default="{ row }"><el-tag :type="row.verified ? 'success' : 'info'" size="small" round>{{ row.verified ? '已审核' : '待审核' }}</el-tag></template>
          </el-table-column>
          <el-table-column prop="uploadDate" label="上传时间" width="140" />
          <el-table-column label="操作" width="160">
            <template #default="{ row }">
              <el-button v-if="!row.uploaded" type="primary" size="small" round>上传</el-button>
              <el-button v-else text type="primary" size="small">查看</el-button>
              <el-button v-if="row.uploaded" text type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const docs = ref([
  { name: '本科毕业证书', type: '学历证书', uploaded: true, verified: true, uploadDate: '2023-07-10' },
  { name: '学士学位证书', type: '学位证书', uploaded: true, verified: true, uploadDate: '2023-07-10' },
  { name: '身份证（正反面）', type: '身份证明', uploaded: true, verified: true, uploadDate: '2023-07-08' },
  { name: '录取通知书', type: '录取材料', uploaded: true, verified: false, uploadDate: '2023-08-15' },
  { name: '政审表', type: '审核材料', uploaded: false, verified: false, uploadDate: '' },
])
</script>

<style scoped>
.page-section { max-width: 1100px; }
.home-card {
  background: #fff; border-radius: 14px; border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(15,43,69,.04), 0 4px 16px rgba(15,43,69,.05); overflow: hidden;
}
.card-header { padding: 15px 20px; background: rgba(255,255,255,0.48); border-bottom: 1px solid rgba(0,0,0,0.04); }
.card-title { font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px; }
.title-dot { width: 10px; height: 10px; border-radius: 50%; background: #153D97; }
.card-body { padding: 20px; }
</style>
