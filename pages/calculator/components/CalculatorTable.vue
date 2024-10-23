<template>
  <el-table
    class="rounded"
    :data="tableData"
    border
    show-summary
    sum-text="Sum"
    height="100%"
    style="width: 100%"
  >
    <el-table-column
      v-for="key in getTableColumns"
      :key="key"
      :prop="key"
      :label="capitalizeFirstLetter(key)"
      :width="getColumnWidth(key)"
    />
  </el-table>
</template>

<script lang="ts" setup>

// Props to receive tableData
const props = defineProps<{
  tableData: Array<Record<string, any>> | any
}>()

// Utility to capitalize the first letter of each column header
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Optionally define column widths based on the key
const getColumnWidth = (key: string) => {
  const widthMap: Record<string, number> = {
    date: 180,
    name: 180,
    address: 300
  }
  return widthMap[key] || 150 // Default width if no match
}

// Computed function to extract column keys dynamically based on the first row of tableData
const getTableColumns = computed(() => {
  if (!props.tableData || props.tableData.length === 0) return [] // Handle empty or invalid data

  // Get keys from the first object to generate columns dynamically
  return Object.keys(props.tableData[0])
})

</script>
