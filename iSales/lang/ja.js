export default {
  navbar: {
    logOut: 'ログオフ',
    dashboard: 'トップページ',
    github: '项目地址',
    screenfull: 'フルスクリーン',
    theme: '画面色チェンジ',
    size: 'サイズ',
    loginTime: '登録時間',
    homeConfig: '最初のページの個性化',
    profile: {
      title: 'マイセンタ',
      timezone: 'タイムゾーン',
      language: '言語',
      primaryPosition: 'ポジション'
    }
  },
  login: {
    title: 'システムログイン',
    logIn: 'ログイン',
    username: 'UID',
    password: 'パスワード',
    any: '自由入力',
    thirdparty: '第三者ログイン',
    thirdpartyTips: 'ローカルではシミュレーション不可！！！'
  },
  tagsView: {
    refresh: 'リフレッシュ',
    close: 'クローズ',
    closeOthers: 'その他をクローズ',
    closeAll: 'すべてをクローズ'
  },
  mideaMessage: {
    defaultErrorInfo: 'エラーが発生しているため、管理者へお問い合わせください!',
    cancelButtonText: '取消',
    confirmButtonText: '確定',
    showMoreText: 'もっと'
  },
  common: {
    noData: '該当するデータがありません。',
    confirm: '確定',
    cancel: '取消',
    success: '成功!',
    add: '新規追加',
    edit: '修正',
    editMutiLang: '多言語エディタ',
    delete: '削除',
    reset: 'リセット',
    layout: 'レイアウト',
    pleaseSelect: 'お選び下さい',
    pleaseSelectOne: 'データを選んでください',
    cannotEdit: '修正したい項目をお選び下さい',
    cannotDelete: '削除したい項目をお選び下さい',
    errorInput: '内容を正しくご入力下さい',
    errorInputLength: '制限の桁数を超えています',
    errorSelect: '内容を正しくお選び下さい',
    errorNumber: '数字をご入力下さい',
    apply: '応用',
    save: '保存',
    save_apply: '応用＆保存',
    layout_title: 'レイアウト',
    tooLong: '一番長い:',
    confirm_enable: '利用可に設定？',
    confirm_disable: '利用禁止？',
    error: 'エラー!',
    pleaseTypeContents: '内容をご入力ください',
    editted: '登録内容を保存?',
    checkEdit: '登録内容をチェックしてください',
    delRow: '該当行を削除する?',
    export: '出力',
    fileName: 'ファイル名',
    editBeforeSave: '未保存の行を修正してください',
    all: 'すべて',
    setMin: 'すべて取消は不可',
    search: '照会',
    enable: '有効',
    disable: '無効',
    show: '表示',
    hide: '隠す',
    onceSave: '一次保存',
    deleteViews: '削除しますが、よろしいですか',
    cannotSave: 'データ変更はありません',
    dataExisted: 'データ登録されています',
    operation: 'オペレーション',
    information: 'メッセージ',
    placeholder: 'キーワードを入力してフィルタリング',
    active: '有効',
    inactive: '無効',
    cannotActive: '有効にしたい項目を選んでください',
    cannotInactive: '無効にしたい項目を選んでください',
    refreshCache: 'キャッシュリフレッシュ',
    cannotrefreshCache: 'リフレッシュしたい項目を選んでください',
    download: 'エクスポート',
    preview: 'プレビュー',
    import: 'インポート',
    selectExportCol: "エクスポートしたい項目を選んでください",
    confirmDelete: '当該データを永遠に削除しますが、よろしいですか？',
    cancelDelete: '削除を取り消しました。',
    yes: 'はい',
    no: 'いいえ',
    loading: 'ロード中',
    synchronize: '移る',
    refresh: '更新',
    copy: 'コピー',
    selectAll: '全数選択',
    more:'その他'
  },
  // 组件
  components: {
    headers: {
      sort: 'ソート',
      columnName: '列名',
      hidden: '隠す',
      width: '幅',
      freeze: 'フリーズ',
      operation: 'オペレーション',
    },
    showFilter: 'フィルタを有効にする',
    left: '左',
    right: '右',
    none: '凍結無し',
    pager: {
      showing: '件数表示',
      showing2: '現在表示',
      to: 'から',
      of: '全て',
      entries: '件'
    },
    condition: {
      bt: 'ｱｲﾀﾞ',
      cn: '含む',
      eq: 'ｲｺｰﾙ',
      ne: 'ﾉｰｲｺｰﾙ',
      me: 'ﾌｸｽｳｾﾝﾀｸ',
      bw: 'から',
      ew: 'まで',
      gt: 'ﾉｰｲｺｰﾙ&以上',
      ge: '以上',
      lt: '以下',
      le: 'ｲｺｰﾙ&以下'
    },
    fileupload: {
      dragfile: '対象のファイルをここに引っ張ってきてください',
      clickupload: 'アップロード',
      fileslimit: 'ファイルの数が制限以上になっている', //Files exceed the number limit
      uploadFailed: 'アップロード失敗!',
      filelist: 'アップロードリスト',
      name: 'ファイル名',
      type: 'ファイルタイプ',
      size: 'ファイルサイズ',
      uploadUserName: 'アップロード者',
      uploadDate: 'アップロード時間',
      previewLoading: 'プレビュー生成中...',
      uploadLoading: 'アップロード中...',
      maxSizeUploadError: 'アップロードファイルのサイズが超えてはいけない',
      minSizeUploadError: 'アップロードファイルのサイズが０以上でなければならない'
    },
    address: {
      detailAddress: 'Detailed Address',
      selectToReturn: 'Please choose one line.',
      countryName: 'Country/region',
      stateName: 'State',
      cityName: 'City',
      districtName: 'District',
      zipcode: 'Zip code',
      address1: 'Address 1',
      address2: 'Address 2',
      address3: 'Address 3',
      addressSelect: 'Address Select',
      selectCountry: 'Please Select Country/region!'
    },
    notice: {
      title: 'Notcie List',
      more: 'More Notices',
      author: 'Author',
      publishTime: 'Publish Time',
      attachments: 'Attachment List',
      headers: {
        title: 'title'
      }
    },
    viewSwitcher: {
      setting: '設定',
      add: '追加',
      base: 'ベースビュー',
      my: 'マイビュー',
      share: 'シェアビュー'
    },
    viewConfig: {
      viewName: 'ビュー名',
      defaultFlag: 'デフォルトビュー',
      pageSize: 'デフォルトデータ表示数',
      appShare: 'シェア',
      showFilter: 'フィルタを有効にする',
      sortField: '標準の並べ替え',
      sortDirection: '並び順',
      layout: 'レイアウト設定',
      column: '候補項目',
      showColumn: '項目表示',
      columnName: 'ヘッダー項目',
      sortable: '並べ替え',
      seq: 'シーケンス',
      filterable: 'フィルター',
      fixed: 'フリーズ',
      columnWidth: '幅',
      dataSetting: 'フィルター設置',
      condition: 'コンディション',
      value: '数値',
      operation: 'オペレーション',
      noSort: '並び順無し',
      viewNameRequired: 'ビュー名称は入力必須!',
      uniqueName: '名称が重複しています'
    },
    // 组织选择公共弹窗
    orgSelection: {
      title: '組織を選んでください',
      organization: '組織',
      selected: '選択済',
      headers: {
        orgName: '組織名称',
        orgCode: '組織コード'
      }
    },
    // 人员选择公共弹窗
    userSelection: {
      title: '対象者を選んでください',
      organization: '組織',
      search: '検索',
      add: '追加',
      allAdd: 'すべてを追加',
      delete: '削除',
      allDelete: 'すべてを削除',
      selected: '選択済',
      person: '人',
      selectData: 'データを選んでください',
      dataExists: 'データは存在しています',
      inputSearchContent: '検索内容を入力してください',
      userName: 'MIP',
      fullName: 'ユーザ名',
      orgName: '組織名',
      positionName: '岗位名'
    },
    // 岗位选择公共弹窗
    orgPositionSel: {
      title: 'ポジションを選んでください',
      organization: '組織',
      position: 'ポジション',
      selected: '選択済',
      add: '追加',
      allAdd: 'すべてを追加',
      delete: '削除',
      allDelete: 'すべてを削除',
      headers: {
        positionName: 'ポジション名',
        primaryUserName: 'キーユーザ',
        primaryEnuCode: '英語名'
      },
      inputSearchContent: '検索内容を入力してください'
    },
    //审批头组件
    approvalHead: {
      headers: {
        pass: '承認',
        refuse: '差戻',
        abandon: '破棄',
        commission: '委託',
        communicate: '連絡',
        circulate: '回覧',
        remind: '催促',
        returnCommunicate: '通信に返信する',
        cancelCommunicate: '通信をキャンセルする',
        return: '取り下げる',
        applicant: '申請者',
        phoneNumber: '電話番号',
        email: 'メールアドレス',
        division: '部門',
        organization: '組織構造',
        contacts: '美的連絡先',
        selected: '選択済',
        person: '人',
        comments: '処理コメント',
        refuseTo: '否認ノード',
        selectNode: '请选择',
        nodeContent: '次回申請提出は該当ノードで承認始まる',
        draftAbandon: '起草者-破棄',
        draftReturn: '起草者-取り下げる',
        approvalProcess: '審査プロセス',
        reason: 'Application Reason',
      },
      tips: {
        passContent: '承認',
        tip: 'ヒント',
        abandonContent: '当該申請を廃棄しますか?',
        returnContent: '当該申請を撤回しますか?',
        inputComments: 'コメントをご入力ください',
        selectCirculatePerson: '回覧者を選んでください',
        selectApprovalPerson: '承認者を選んでください',
        approvalCompletion: '操作が成功しました',
        selectData: 'データを選んでください',
        dataExists: 'データが存在しています',
        inputSearchContent: '検索内容をご入力ください'
      },
      button: {
        search: '検索',
        add: '追加',
        allAdd: '全体追加',
        delete: '削除',
        allDelete: '全体削除',
        cancel: 'キャンセル',
        confirm: '確認',
        process: 'プロセス'
      }
    },
    stratProcess: {
      title: '申請リスト',
      headers: {
        docSubject: '申請件名',
        docStatusValue: '状態',
        docCreatorLoginName: '申請者',
        docPublishTime: 'リリース時間',
        docCreateTime: '申請时间',
        inputKeywordSearch: 'キーワードを入力',
        pleaseSelect: '選択してください',
        stratTime: '開始時間',
        endTime: '終了時間'
      },
      options: {
        created: '作成中',//10
        approving: '承認待ち',//20
        approved: '承認',//30
        rejected: '差戻し',//11
        cancelled: '無効',//00
        withdraw: '返却',//40
        deleted: '削除',//50
        error: 'エラー'//21
      },
      tips: {
        paramError: 'パラメータエラー',
        webJump: 'ページジャンプ中...',
      }
    },
    workedProcess: {
      title: '承認済みワークフロー',
      headers: {
        fdSubject: '申請件名',
        fdHandlerName: '操作者',
        docCreatorName: '申請者',
        fdStatus: '状態',
        fdEndDate: '申請年月日',
        attachment: '添付',
        attachmentReview: '添付一覧',
        inputKeywordSearch: 'キーワードを入力',
        stratTime: '開始時間'
      },
      tips: {
        paramError: 'パラメータエラー',
        webJump: 'ページジャンプ中...'
      }
    },
    runningProcess: {
      title: '未承認のワークフロー',
      headers: {
        fdSubject: '申請件名',
        fdHandlerName: '操作者',
        docCreatorName: '申請者',
        fdStatus: '状態',
        fdNodeStarDate: '申請年月日',
        attachment: '添付',
        attachmentReview: '添付一覧',
        inputKeywordSearch: 'キーワードを入力',
        stratTime: '開始時間'
      },
      tips: {
        paramError: 'パラメータエラー',
        webJump: 'ページジャンプ中...',
      },
      options: {
        created: '作成中',//10
        approving: '承認待ち',//20
        approved: '承認',//30
        rejected: '差戻し',//11
        cancelled: '無効',//00
        withdraw: '返却',//40
        deleted: '削除',//50
        error: 'エラー'//21
      }
    },
    processTable: {
      headers: {
        flowStatus: '承認フロー状態',
        fdNodeName: 'ノード',
        fdHandlerName: '操作者',
        fdOperationName: 'オペレーション',
        fdAuditeInfo: '承認コメント',
        fdHandlerTime: '承認日時',
        inputKeywordSearch: 'キーワードを入力',
        stratTime: '開始時間'
      }
    },
    flownode: {
      nodeId: "ノードID",
      nodeName: "ノード名",
      processValue: "承認タイプ",
      handlerNames: "承認者",
      selectUser: "選択",
    },
    eio: {
      config:'Excelテンプレートが見つかりません',
      importTitle: "Excelインポート",
      codeRequire: "入力必須な検索条件項目が入力されていない：templatecode",
      serviceRequire: "入力必須な検索条件項目が入力されていない：servicename",
      template: "テンプレートダウンロード",
      file: "ファイルインポート",
      selectFile: "対象ファイルを選択",
      importFile: "ファイルインポート",
      importTip: "xls/xlsx式のファイルしか読み込めない",
      importResult: "インポート結果",
      importing: '取り込み中...',
      uploadFailed: 'アップロード失敗!',
      importSuccess: 'インポート済',
      importFailed: 'インポート失敗',
      importError: 'インポートエラー',
      resultInfo: '済：%s件，失敗：%s件，時間：%s秒',
      errorExcel: 'クリックしてエラーメッセージを確認',
      errorDownload: 'ダウンロードエラー',
      templateExport: 'テンプレートでExport',
      downloadTemplate: '決まったテンプレートでインポートしてください',
      customExport: '好みの設定でExport',
      exportFileName: 'データExport',
      exportTitle: 'Excel Export設定',
      filenameRequire: 'ファイル名入力必須',
      fileRequire: '対象ファイルをお選びください',
      exportList: '导出列表',
      headers:{
        startTime:'开始时间',
        endTime:'结束时间',
        duration:'耗时(秒)',
        success:'成功数量',
        fail:'失败数量',
        status:'状态',
        remark:'备注',
        attachmentId:'下载'
      }
    },
    auth: {
      headers: {
        application: '应用',
        serviceName: '服务',
        path: '路径'
      }
    },
    homepage: {
      step1: '参数配置',
      step2: '布局配置',
      step3: '挂件配置',
      next: '下一步',
      previous: '上一步',
      notice: 'PS：如无特殊要求，可保持默认值进入下一步',
      colNum: '网格列数',
      rowHeight: '行的高度(px)',
      marginX: '水平间隔(px)',
      marginY: '垂直间隔(px)',
      draggable: '是否可拖拽',
      resizable: '是否可缩放',
      maxRows: '最大行数',
      background: '背景色',
      addBlock: '添加区域',
      layoutInfo: '可拖拽！可缩放！',
      selectWidget: '选择挂件',
      publicWidget: '公共挂件',
      privateWidget: '产品挂件',
      select: '选择',
      saveError: '存在未配置挂件的区域!',
      referenceResolution: '参考分辨率',
      saverefresh:'保存并刷新',
      default:'使用默认首页请点击',
      restoreDefault: '恢复默认',
      AdvancedConfig: '高级配置',
      normalConfig:'普通配置',
      normalInfo:'PS:红框窗口可拖拽可缩放可选配挂件',
    }
  },
  loginError:{
    "ISC-950":"ユーザーが存在していない或いはパスワード誤りです!",
    "ISC-920":"无用户登录信息禁止访问服务！",
    "ISC-912":"获取Profile失败！",
    "ISC-903":"用户名或密码为空！",
    "ISC-904":"SSO登录失败！",
    "ISC-914":"系统名或令牌为空！",
    "ISC-911":"SSO获取用户名失败！",
    "ISC-913":"SSO获取Token失败！",
    "ISC-980":"SSO访问权限未配置!",
    "ISC-981":"IP在黑名单中，禁止访问！",
    "ISC-982":"SSO服务不在IP白名单中，禁止访问！",
  }
}
