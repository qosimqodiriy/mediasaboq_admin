<script setup lang="ts">
import { uploadPhoto } from '@/services/common'
import Editor from '@tinymce/tinymce-vue'
import FormData from 'form-data';
const url = import.meta.env.VITE_BASE_URL2
async function handleImageUpload(blobInfo: any, success: any, failure: any, folderName: any) {
  try {
        const formData = new FormData()

        formData.append('image', blobInfo.blob())

        const result = await uploadPhoto(formData)

        success(`${url}${result[1].data}`)
      } catch (error) {
        throw (error)
      }
}
</script>
<template>
     <Editor
       api-key="1yt8kb37zy0a57vbymcq0bq493c6zpymw4ehb6lev3dn5tvg"
       output-format="html"
       :init="{
         images_upload_credentials: true,
         images_upload_handler: handleImageUpload,
         height: 300,
         width: '100%',
         menubar: false,
         plugins: [
		     'advlist autolink link image lists charmap print preview hr anchor pagebreak',
		     'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
		     'save table contextmenu directionality emoticons template paste textcolor',
         'image imagetools'
	],
         toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons | image code preview imagetools undo redo',
       }"
     />
 </template>
