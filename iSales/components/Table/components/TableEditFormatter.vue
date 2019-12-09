<script>
  export default {
    name: 'TableEditFormatter',
    functional: true,
    props: {
      row: {
        type: Object,
        default: null
      },
      column: {
        type: Object,
        default: null
      },
      index: {
        type: Number,
        default: null
      },
      rowEditting: {
        type: Boolean,
        default: false
      }
    },
    render: (h, ctx) => {
      if(ctx.props.column && typeof(ctx.props.column.formatter)==='function'){
        return ctx.props.column.formatter(h, ctx.props.row, ctx.props.column, ctx.props.row[ctx.props.column.prop], ctx.props.index, ctx.props.rowEditting)
      }else{
        return ''
      }
    }
  }
</script>
