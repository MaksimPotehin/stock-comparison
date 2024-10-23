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
      :row-key="rowKey"
      :border="withBorder"
      :rowClassName="rowClassName"
      :defaultSort="defaultSort"
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
        <template #header="{column, $index}">
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
              v-if="!row[heading.value] || heading.formatter && !heading.formatter(row[heading.value])"
              type="warning"
            >
              Not defined
            </el-tag>

            <span v-else :class="heading.colClassName || 'text-black-600'">
              {{
                heading.isDate ? useFilters.date(row[heading.value]):
                heading.formatter ? heading.formatter(row[heading.value]) : row[heading.value]
              }}
            </span>
          </slot>
        </template>
      </el-table-column>

      <!-- no data -->
      <template #empty />
    </el-table>
  </client-only>
</template>

<script lang="ts" setup generic="T extends object">
import type { Sort, TableColumnCtx } from 'element-plus'

const props = withDefaults(defineProps<{
  data: T[]
  headings: any[]
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

console.log('data', props.data)

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
  @apply min-h-[200px]
}
</style>
