<template>
  <div class="page-section">
    <div class="home-card">
      <div class="card-header"><span class="card-title"><span class="title-dot"></span>学期注册</span></div>
      <div class="card-body">
        <el-table :data="registers" stripe size="default">
          <el-table-column prop="semester" label="学期" min-width="200" />
          <el-table-column label="注册状态" width="120" align="center">
            <template #default="{ row }"><el-tag :type="row.status==='已注册'?'success':'warning'" size="small" round>{{ row.status }}</el-tag></template>
          </el-table-column>
          <el-table-column prop="registerDate" label="注册时间" width="160" align="center" />
          <el-table-column prop="location" label="注册地点" min-width="160" />
          <el-table-column label="操作" width="140" align="center">
            <template #default="{ row }">
              <el-button v-if="row.status === '待注册'" type="primary" size="small" round @click="handleRegister(row)">立即注册</el-button>
              <el-button v-else text type="primary" size="small">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="margin-top: 16px; justify-content: center;" background layout="prev, pager, next" :total="registers.length" :page-size="10" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const registers = ref([
  { semester: '2025-2026学年第二学期', status: '已注册', registerDate: '2026-02-20', location: '线上注册' },
  { semester: '2025-2026学年第一学期', status: '已注册', registerDate: '2025-09-05', location: '计算机学院学工办' },
  { semester: '2024-2025学年第二学期', status: '已注册', registerDate: '2025-02-22', location: '计算机学院学工办' },
])
function handleRegister(row) { ElMessage.success(`${row.semester} 注册成功`); row.status = '已注册'; row.registerDate = new Date().toISOString().split('T')[0] }
</script>
<style scoped>
.page-section { max-width: 900px; }
.home-card { background: #fff;  overflow: hidden; }
.card-header { padding: 15px 20px; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
.card-title { font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px; }
.title-dot { width: 10px; height: 10px; border-radius: 50%; background: #153D97; }
.card-body { padding: 20px; }
</style>
