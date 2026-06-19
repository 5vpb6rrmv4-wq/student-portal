<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header>
        <div class="section-title">
          变更导师申请
          <el-button type="primary" size="small" @click="showAdd = true"><el-icon><Plus /></el-icon>发起申请</el-button>
        </div>
      </template>
      <el-table :data="applications" stripe size="default">
        <el-table-column prop="applyDate" label="申请日期" width="120" />
        <el-table-column prop="originalAdvisor" label="原导师" width="120" />
        <el-table-column prop="newAdvisor" label="新导师" width="120" />
        <el-table-column prop="reason" label="变更原因" min-width="200" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }"><el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag></template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default><el-button text type="primary" size="small">查看</el-button></template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showAdd" title="变更导师申请" width="550px">
      <el-form :model="form" label-width="90px">
        <el-form-item label="原导师"><el-input v-model="form.originalAdvisor" disabled /></el-form-item>
        <el-form-item label="新导师" required>
          <el-select v-model="form.newAdvisor" style="width: 100%;" placeholder="请选择新导师">
            <el-option label="王教授 - 计算机学院" value="王教授" />
            <el-option label="赵教授 - 计算机学院" value="赵教授" />
          </el-select>
        </el-form-item>
        <el-form-item label="变更原因" required>
          <el-input v-model="form.reason" type="textarea" :rows="4" placeholder="请详细说明变更导师的原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交申请</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const showAdd = ref(false)
const applications = ref([
  { applyDate: '2025-11-10', originalAdvisor: '张教授', newAdvisor: '李教授', reason: '研究方向调整', status: '已通过' },
])

const form = reactive({ originalAdvisor: '李教授', newAdvisor: '', reason: '' })

function statusType(s) { return s === '已通过' ? 'success' : s === '审核中' ? 'warning' : 'info' }
function handleSubmit() {
  if (!form.newAdvisor || !form.reason) { ElMessage.warning('请填写完整信息'); return }
  ElMessage.success('申请已提交')
  showAdd.value = false
}
</script>
<style scoped>.page-section { max-width: 900px; }</style>
