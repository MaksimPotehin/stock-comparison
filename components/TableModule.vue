<template>
  <client-only>
    <el-table
      v-bind="$attrs"
      ref="tableRef"
      class="rounded mb-3"
      :data="data"
      height="100%"
      style="width: 100%"
      show-summary
      sum-text="Sum"
      :summary-method="calculateSummary"
      :row-key="rowKey"
      :border="withBorder"
      :rowClassName="rowClassName"
      :defaultSort="defaultSort"
      :show-header="showHeader"
      :show-checkbox="showCheckbox"
      :without-scroll="withoutScroll"
      :auto-height="autoHeight"
      :style="{ width: customTableWidth }"
    >
      <el-table-column
        v-for="(heading, index) in headings"
        :key="heading.value + heading.label + index"
        :label="heading.label"
        :fixed="heading.fixed"
        :prop="heading.value"
        :width="heading.width"
        :min-width="heading.minWidth"
        :align="heading.align"
        :sortable="heading.sortable"
        :sort-method="heading.sortMethod"
        :formatter="heading.formatter"
        :label-class-name="(heading.headingClasses || 'text-black-900 font-medium') + ' !break-normal'"
        :class-name="heading.className + ' ' + heading.align"
        show-overflow-tooltip
      >
        <template #header="{ column, $index }">
          <slot :name="`${heading.value}_heading`" :column="column" :index="$index">
            {{ heading.label }}
          </slot>
        </template>

        <template #default="{ row, column, $index }">
          <slot
            :name="heading.value"
            :row="row"
            :column="column"
            :index="$index"
          >
            <el-tag
              v-if="!row[heading.value] || (heading.formatter && !heading.formatter(row[heading.value]))"
              type="warning"
            >
              Not defined
            </el-tag>
            <span v-else :class="heading.colClassName || 'text-black-600'">
              {{
                heading.isDate ? useFilters.date(row[heading.value]) :
                heading.formatter ? heading.formatter(row[heading.value]) : row[heading.value]
              }}
            </span>
          </slot>
        </template>
      </el-table-column>

      <!-- no data -->
      <template #empty>
        <div v-if="showPlaceholderIcon" class="flex flex-col items-center justify-center h-[200px]">
          <el-icon class="text-gray-400 mb-4" :size="48"><Document /></el-icon>
          <p class="text-gray-400">No data</p>
        </div>
      </template>
    </el-table>
  </client-only>
</template>

<script lang="ts" setup generic="T extends Record<string, any>">
import { ref } from 'vue'
import type { Sort, TableColumnCtx } from 'element-plus'
import { Document } from '@element-plus/icons-vue'
import { useFilters } from '~/composables/filters'

interface ITableHeading {
  value: string
  label: string
  minWidth?: number
  width?: number
  fixed?: boolean
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  sortMethod?: (a: any, b: any) => number
  formatter?: (value: any) => string
  headingClasses?: string
  className?: string
  colClassName?: string
  isDate?: boolean
}

interface ITableColumn {
  property: string
  [key: string]: any
}

withDefaults(defineProps<{
  data: T[]
  headings: ITableHeading[]
  withBorder?: boolean
  showCheckbox?: boolean
  showHeader?: boolean
  rowKey?: string
  withoutScroll?: boolean
  autoHeight?: boolean
  customTableWidth?: string
  showPlaceholderIcon?: boolean
  defaultSort?: Sort
  rowClassName?: () => string
}>(), {
  data: () => ([]),
  withBorder: true,
  rowKey: 'id',
  showHeader: true,
  withoutScroll: true,
  showPlaceholderIcon: true
})

const tableRef = ref()

// Метод для підсумків таблиці
function calculateSummary ({ columns, data }: { columns: ITableColumn[]; data: T[] }): string[] {
  const summary = columns.map((column: ITableColumn) => {
    if (!data?.length) return '0.00'

    if (column.property === 'initialDeposit') {
      // Acc value: беремо значення з останнього рядка
      const lastRow = data[data.length - 1]
      const value = lastRow?.initialDeposit
      return value !== undefined && value !== null ? parseFloat(value.toString()).toFixed(2) : '0.00'
    } else if (column.property === 'totalAmount') {
      // Total amount: останнє значення або сума Acc value + всі відсотки
      const lastRow = data[data.length - 1]
      if (lastRow?.totalAmount !== undefined && lastRow?.totalAmount !== null) {
        return parseFloat(lastRow.totalAmount.toString()).toFixed(2)
      }
      const totalAccValue = data.reduce((sum, row: T) => {
        const value = row?.initialDeposit
        return sum + (value !== undefined && value !== null ? parseFloat(value.toString()) : 0)
      }, 0)
      const totalInterest = data.reduce((sum, row: T) => {
        const value = row?.interestPerPeriod
        return sum + (value !== undefined && value !== null ? parseFloat(value.toString()) : 0)
      }, 0)
      return (totalAccValue + totalInterest).toFixed(2)
    } else if (column.property === 'interestPerPeriod') {
      // InterestPerPeriod: сума всіх відсотків
      return data.reduce((sum, row: T) => {
        const value = row?.interestPerPeriod
        return sum + (value !== undefined && value !== null ? parseFloat(value.toString()) : 0)
      }, 0).toFixed(2)
    }
    return ''
  })
  return summary
}

defineSlots<{
  [index: `${string}_heading`]: (props: { column: TableColumnCtx<T>; index: number }) => void
  [index: string]: (props: { row: T; column: TableColumnCtx<T>; index: number }) => void
  empty(): void
}>()
</script>

<style lang="scss">
.el-checkbox .el-checkbox__inner {
  @apply w-16 h-16 #{!important};
}
.el-table__empty-block {
  @apply min-h-[200px];
}
</style>
