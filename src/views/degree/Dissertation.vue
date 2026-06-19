<template>
  <div class="page-section">
    <el-card shadow="never">
      <template #header><div class="section-title">学位论文</div></template>
      <el-tabs type="border-card" tab-position="left">
        <el-tab-pane label="论文开题报告">
          <div class="tab-content">
            <el-descriptions :column="2" border size="default">
              <el-descriptions-item label="论文题目">基于深度学习的图像识别算法研究与优化</el-descriptions-item>
              <el-descriptions-item label="开题日期">2025-03-20</el-descriptions-item>
              <el-descriptions-item label="开题结果">通过</el-descriptions-item>
              <el-descriptions-item label="评审专家">王教授、赵教授、周教授</el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" size="small" style="margin-top: 12px;">查看开题报告</el-button>
            <el-button size="small" style="margin-top: 12px; margin-left: 8px;">下载开题报告</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="论文中期报告">
          <div class="tab-content">
            <el-descriptions :column="2" border size="default">
              <el-descriptions-item label="论文题目">基于深度学习的图像识别算法研究与优化</el-descriptions-item>
              <el-descriptions-item label="中期检查日期">2026-01-15</el-descriptions-item>
              <el-descriptions-item label="检查结果">通过</el-descriptions-item>
              <el-descriptions-item label="论文完成度">60%</el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" size="small" style="margin-top: 12px;">上传中期报告</el-button>
            <el-button size="small" style="margin-top: 12px; margin-left: 8px;">查看中期报告</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="论文评审报名">
          <div class="tab-content">
            <el-alert title="论文评审报名开放时间: 2026年9月1日-9月15日" type="info" :closable="false" show-icon style="margin-bottom: 16px;" />
            <el-empty description="报名尚未开放">
              <el-button type="primary" disabled>立即报名</el-button>
            </el-empty>
          </div>
        </el-tab-pane>

        <el-tab-pane label="论文评审管理">
          <el-table :data="reviews" stripe size="default">
            <el-table-column prop="reviewer" label="评审专家" width="120" />
            <el-table-column label="评审结果" width="100"><template #default="{ row }"><el-tag :type="row.result==='同意答辩'?'success':'warning'" size="small">{{ row.result }}</el-tag></template></el-table-column>
            <el-table-column prop="score" label="评分" width="80" />
            <el-table-column prop="comment" label="评审意见" min-width="240" />
            <el-table-column label="操作" width="100"><template #default><el-button text type="primary" size="small">查看详情</el-button></template></el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="论文预答辩管理">
          <el-descriptions :column="2" border size="default">
            <el-descriptions-item label="预答辩状态">待安排</el-descriptions-item>
            <el-descriptions-item label="预计时间">2026年11月</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <el-tab-pane label="论文答辩管理">
          <el-empty description="答辩尚未安排">
            <el-button type="primary" disabled>查看详情</el-button>
          </el-empty>
        </el-tab-pane>

        <el-tab-pane label="优秀论文申请">
          <el-button type="primary" size="small">申请优秀论文</el-button>
          <el-empty description="暂无申请记录" :image-size="48" style="margin-top: 16px;" />
        </el-tab-pane>

        <el-tab-pane label="学位论文存档">
          <el-alert title="请在答辩通过后上传最终版论文进行存档" type="warning" :closable="false" show-icon style="margin-bottom: 16px;" />
          <el-empty description="暂无存档记录" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const reviews = ref([])
</script>
<style scoped>
.page-section { max-width: 1100px; }
.tab-content { min-height: 200px; }
</style>
