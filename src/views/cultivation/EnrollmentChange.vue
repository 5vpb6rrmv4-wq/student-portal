<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header>
        <div class="section-title">
          学籍异动申请
          <el-button type="primary" size="small" @click="showAdd = true"><el-icon><Plus /></el-icon>提交申请</el-button>
        </div>
      </template>
      <el-table :data="applications" stripe size="default">
        <el-table-column prop="type" label="异动类型" width="120"><template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template></el-table-column>
        <el-table-column prop="reason" label="申请原因" min-width="220" />
        <el-table-column prop="applyDate" label="申请日期" width="120" />
        <el-table-column label="状态" width="120">
          <template #default="{ row }"><el-tag :type="statusType(row.status)" size="small">{{ row.status }}</el-tag></template>
        </el-table-column>
        <el-table-column label="操作" width="120"><template #default><el-button text type="primary" size="small">查看</el-button></template></el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="showAdd" title="学籍异动申请" width="550px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="异动类型" required>
          <el-select v-model="form.type" style="width: 100%;">
            <el-option label="休学" value="休学" />
            <el-option label="复学" value="复学" />
            <el-option label="退学" value="退学" />
            <el-option label="转专业" value="转专业" />
            <el-option label="延期毕业" value="延期毕业" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请原因" required>
          <el-input v-model="form.reason" type="textarea" :rows="4" placeholder="请详细说明申请原因" />
        </el-form-item>
        <el-form-item label="证明材料">
          <el-upload action="#" :auto-upload="false" :limit="3">
            <el-button size="small" type="primary">上传附件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAdd = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
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
  { type: '延期毕业', reason: '科研项目需要额外时间完成', applyDate: '2026-05-20', status: '审核中' },
])
const form = reactive({ type: '', reason: '' })

function statusType(s) { return s === '已通过' ? 'success' : s === '审核中' ? 'warning' : 'info' }
function handleSubmit() { ElMessage.success('申请已提交'); showAdd.value = false }
</script>
<style scoped>.page-section { max-width: 900px; }</style>
