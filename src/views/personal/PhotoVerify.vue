<template>
  <div class="page-section">
    <div class="home-card">
      <div class="card-header"><span class="card-title"><span class="title-dot"></span>照片核对</span></div>
      <div class="card-body">
        <el-alert title="请上传本人近期免冠证件照用于学籍信息。蓝底、正面、免冠，480×640px，JPG格式，≤200KB。" type="info" :closable="false" show-icon style="margin-bottom: 24px;" />
        <el-row :gutter="30">
          <el-col :span="8">
            <div class="photo-box">
              <div class="photo-preview">
                <el-icon :size="48" color="#64748b"><UserFilled /></el-icon>
                <p class="photo-hint">学籍照片</p>
                <p><el-tag type="success" round>已上传</el-tag></p>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-upload drag action="#" :auto-upload="false" :limit="1" accept=".jpg,.jpeg" class="upload-area">
              <el-icon :size="40"><UploadFilled /></el-icon>
              <div class="upload-text">将照片拖到此处，或<em>点击上传</em></div>
              <template #tip><div class="upload-tip">仅支持 JPG 格式，大小不超过 200KB</div></template>
            </el-upload>
            <el-button type="primary" round style="margin-top: 16px;">确认上传</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
</script>
<style scoped>
.page-section { max-width: 900px; }
.home-card { background: #fff;  overflow: hidden; }
.card-header { padding: 15px 20px; background: #f8fafc; border-bottom: 1px solid #f1f5f9; }
.card-title { font-size: 15px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px; }
.title-dot { width: 10px; height: 10px; border-radius: 50%; background: #153D97; }
.card-body { padding: 20px; }
.photo-box { border: 2px dashed #e2e8f0; border-radius: 14px; overflow: hidden; }
.photo-preview { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 36px 20px; background: #fafcfd; min-height: 200px; }
.photo-hint { margin-top: 10px; color: #475569; font-size: 13px; }
.upload-area { width: 100%; }
.upload-text { margin-top: 8px; color: #64748b; font-size: 13px; }
.upload-text em { color: #153D97; font-style: normal; font-weight: 600; }
.upload-tip { color: #475569; font-size: 12px; margin-top: 8px; }
</style>
