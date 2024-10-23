<template>
  <client-only>
    <el-table
      class="rounded"
      :data="tableData"
      border
      show-summary
      sum-text="Сума"
      height="100%"
      style="width: 100%"
    >
      <el-table-column
        v-if="tableData.length === 0"
        :label="'Дані відсутні'"
        align="center"
      />
      <el-table-column
        v-for="key in getTableColumns"
        :key="key"
        :prop="key"
        :label="capitalizeFirstLetter(key)"
        :width="getColumnWidth(key)"
      />
      <el-table-column
        label="Сума відсотків"
        :summary-method="calculateTotalInterest"
        :align="'right'"
        width="150"
      />
    </el-table>
  </client-only>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

// Define the structure of table data for better type safety
interface ITableData {
  period: number
  initialDeposit: string
  interestPerPeriod: string
  totalAmount: string
  date: string
}

// Props to receive tableData
const props = defineProps<{
  tableData: ITableData[]
}>()

// Utility to capitalize the first letter of each column header
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Optionally define column widths based on the key
const getColumnWidth = (key: string) => {
  const widthMap: Record<string, number> = {
    period: 100,
    initialDeposit: 150,
    interestPerPeriod: 150,
    totalAmount: 150,
    date: 180
  }
  return widthMap[key] || 150 // Default width if no match
}

// Computed function to extract column keys dynamically based on the first row of tableData
const getTableColumns = computed(() => {
  if (!props.tableData || props.tableData.length === 0) return [] // Handle empty or invalid data

  // Get keys from the first object to generate columns dynamically
  return Object.keys(props.tableData[0])
})

// Method to calculate the total interest from the interestPerPeriod column
const calculateTotalInterest = (rows: ITableData[]) => {
  return rows.reduce((total, row) => total + parseFloat(row.interestPerPeriod), 0).toFixed(2)
}

</script>
