<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">学风建设</div></template>
      <el-tabs type="border-card">
        <el-tab-pane label="学业纪实录入">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>录入纪实</el-button>
          <el-table :data="records" stripe size="default">
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="type" label="类别" width="120"><template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template></el-table-column>
            <el-table-column prop="content" label="内容摘要" min-width="260" />
            <el-table-column label="操作" width="160">
              <template #default><el-button text type="primary" size="small">编辑</el-button><el-button text type="danger" size="small">删除</el-button></template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin-top: 16px; justify-content: center;" background layout="prev, pager, next" :total="records.length" :page-size="10" />
        </el-tab-pane>
        <el-tab-pane label="学业指导录入">
          <el-button type="primary" size="small" style="margin-bottom: 12px;"><el-icon><Plus /></el-icon>录入指导</el-button>
          <el-table :data="guidances" stripe size="default">
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="advisor" label="指导老师" width="120" />
            <el-table-column prop="topic" label="指导主题" min-width="200" />
            <el-table-column prop="content" label="内容摘要" min-width="200" />
            <el-table-column label="操作" width="160">
              <template #default><el-button text type="primary" size="small">查看</el-button><el-button text type="danger" size="small">删除</el-button></template>
            </el-table-column>
          </el-table>
          <el-pagination style="margin-top: 16px; justify-content: center;" background layout="prev, pager, next" :total="guidances.length" :page-size="10" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
const records = ref([
  { date: '2026-06-10', type: '学术活动', content: '参加学院学术讲座：人工智能前沿技术' },
  { date: '2026-06-05', type: '论文进展', content: '完成论文第二章节初稿撰写' },
])
const guidances = ref([
  { date: '2026-06-12', advisor: '李教授', topic: '论文选题指导', content: '讨论确定了论文研究方向为深度学习图像识别' },
])
</script>
<style scoped>.page-section { max-width: 1000px; }</style>
