import { WizardState } from './types';

export function generateArticles(state: WizardState): string {
  const { basicInfo, officerInfo, shareInfo, businessPurposes, addressInfo } = state;

  const companyFullName = `${basicInfo.companyType || '株式会社'}${basicInfo.companyName || '○○'}`;
  const address = addressInfo
    ? `${addressInfo.prefecture || ''}${addressInfo.city || ''}${addressInfo.streetAddress || ''}${addressInfo.buildingName ? ' ' + addressInfo.buildingName : ''}`
    : '';
  const purposes = businessPurposes.map((p, i) => `　${i + 1}．${p.text}`).join('\n');
  const directors = officerInfo?.directors || [];
  const representativeDirector = directors.find(d => d.isRepresentative);
  const otherDirectors = directors.filter(d => !d.isRepresentative);

  const fiscalMonth = basicInfo.fiscalYearStartMonth || 4;
  const fiscalEndMonth = fiscalMonth === 1 ? 12 : fiscalMonth - 1;
  const fiscalMonthStr = String(fiscalMonth).padStart(2, '0');
  const fiscalEndMonthStr = String(fiscalEndMonth).padStart(2, '0');

  const isKabushiki = basicInfo.companyType === '株式会社';

  let doc = '';

  doc += `${companyFullName}\n`;
  doc += `定　　款\n\n`;

  // 第1章 総則
  doc += `第１章　総則\n\n`;

  doc += `（商号）\n`;
  doc += `第１条　当会社は、${companyFullName}と称する。\n\n`;

  doc += `（目的）\n`;
  doc += `第２条　当会社は、次の事業を営むことを目的とする。\n`;
  doc += `${purposes || '　1．各種事業の企画・運営'}\n\n`;

  doc += `（本店の所在地）\n`;
  doc += `第３条　当会社は、本店を${address || '○○'}に置く。\n\n`;

  if (isKabushiki) {
    doc += `（機関設計）\n`;
    doc += `第４条　当会社は、株主総会及び取締役のほか、次の機関を置く。\n`;
    if (officerInfo?.auditor) {
      doc += `　一　監査役\n`;
    }
    doc += `\n`;

    // 第2章 株式
    doc += `第２章　株式\n\n`;

    doc += `（発行可能株式総数）\n`;
    doc += `第５条　当会社の発行可能株式総数は、${(shareInfo?.authorizedShares || 0).toLocaleString()}株とする。\n\n`;

    doc += `（株式の譲渡制限）\n`;
    doc += `第６条　当会社の株式を譲渡するには、${isKabushiki ? '取締役会の' : '社員総会の'}承認を要する。\n`;
    if (!shareInfo?.hasTransferRestriction) {
      doc += `ただし、当会社が譲渡の当事者である場合には、この限りでない。\n`;
    }
    doc += `\n`;

    doc += `（株主名簿管理人）\n`;
    doc += `第７条　当会社の株主名簿の管理は、当会社が行う。\n\n`;

    doc += `（株券の不発行）\n`;
    doc += `第８条　当会社の株式については、株券を発行しない。\n\n`;

    doc += `（基準日）\n`;
    doc += `第９条　当会社は、毎事業年度末日の最終の株主名簿に記載された議決権を有する株主をもって、その事業年度に関する定時株主総会において権利を行使することができる株主とする。\n\n`;

    // 第3章 株主総会
    doc += `第３章　株主総会\n\n`;

    doc += `（定時株主総会）\n`;
    doc += `第１０条　当会社の定時株主総会は、毎事業年度終了後３ヶ月以内に招集し、臨時株主総会は、必要に応じて招集する。\n\n`;

    doc += `（招集権者）\n`;
    doc += `第１１条　株主総会は、法令に別段の定めがある場合を除き、取締役が招集する。\n\n`;

    doc += `（招集通知）\n`;
    doc += `第１２条　株主総会の招集通知は、会日より１週間前までに各株主に対して発する。ただし、株主全員の同意がある場合には、招集の手続きを省略することができる。\n\n`;

    doc += `（議長）\n`;
    doc += `第１３条　株主総会の議長は、代表取締役がこれにあたる。代表取締役が欠席の場合には、出席取締役の互選によって議長を定める。\n\n`;

    doc += `（決議の方法）\n`;
    doc += `第１４条　株主総会の決議は、法令または本定款に別段の定めがある場合を除き、出席した議決権を行使することができる株主の議決権の過半数をもって行う。\n\n`;

    doc += `（書面決議）\n`;
    doc += `第１５条　当会社は、株主総会の決議の目的である事項について、議決権を行使することができる株主の全員が書面または電磁的記録により同意の意思表示をしたときは、当該事項を可決する旨の株主総会の決議があったものとみなす。\n\n`;

    // 第4章 取締役及び代表取締役
    doc += `第４章　取締役及び代表取締役\n\n`;

    doc += `（取締役の員数）\n`;
    doc += `第１６条　当会社の取締役は、１名以上とする。\n\n`;

    doc += `（取締役の選任）\n`;
    doc += `第１７条　取締役は、株主総会において選任する。\n\n`;

    doc += `（取締役の任期）\n`;
    doc += `第１８条　取締役の任期は、選任後１０年以内に終了する事業年度のうち最終のものに関する定時株主総会の終結の時までとする。\n\n`;

    doc += `（代表取締役）\n`;
    doc += `第１９条　当会社の代表取締役は、取締役の互選によって定める。\n\n`;

    doc += `（取締役の報酬等）\n`;
    doc += `第２０条　取締役の報酬、賞与その他の職務執行の対価として当会社から受ける財産上の利益は、株主総会の決議によって定める。\n\n`;

    if (officerInfo?.auditor) {
      doc += `（監査役）\n`;
      doc += `第２１条　当会社の監査役は、１名以上とする。\n\n`;

      doc += `（監査役の選任）\n`;
      doc += `第２２条　監査役は、株主総会において選任する。\n\n`;

      doc += `（監査役の任期）\n`;
      doc += `第２３条　監査役の任期は、選任後４年以内に終了する事業年度のうち最終のものに関する定時株主総会の終結の時までとする。\n\n`;
    }

    // 第5章 計算
    doc += `第５章　計算\n\n`;

    doc += `（事業年度）\n`;
    const nextChapterFirstArticle = officerInfo?.auditor ? 24 : 21;
    doc += `第${nextChapterFirstArticle}条　当会社の事業年度は、毎年${fiscalMonthStr}月１日から${fiscalEndMonthStr}月末日までの１年間とする。\n\n`;

    doc += `（剰余金の配当）\n`;
    doc += `第${nextChapterFirstArticle + 1}条　当会社は、毎事業年度終了後、定時株主総会の決議によって、剰余金の配当を行うことができる。\n\n`;

  } else {
    // 合同会社などの場合
    doc += `第２章　社員及び出資\n\n`;

    doc += `（社員の氏名及び出資）\n`;
    doc += `第５条　社員の氏名及び出資の価額は、次のとおりとする。\n`;
    directors.forEach(d => {
      doc += `　氏名：${d.name}　出資額：金${Math.floor((basicInfo.capital || 0) / Math.max(directors.length, 1)).toLocaleString()}円\n`;
    });
    doc += `\n`;

    doc += `第３章　業務執行\n\n`;

    doc += `（業務執行社員）\n`;
    doc += `第６条　当会社の業務を執行する社員は、次のとおりとする。\n`;
    directors.forEach(d => {
      doc += `　${d.name}\n`;
    });
    doc += `\n`;

    doc += `（代表社員）\n`;
    doc += `第７条　当会社の代表社員は、次のとおりとする。\n`;
    if (representativeDirector) {
      doc += `　${representativeDirector.name}\n`;
    }
    doc += `\n`;

    doc += `第４章　計算\n\n`;

    doc += `（事業年度）\n`;
    doc += `第８条　当会社の事業年度は、毎年${fiscalMonthStr}月１日から${fiscalEndMonthStr}月末日までの１年間とする。\n\n`;
  }

  // 附則
  doc += `附　則\n\n`;

  doc += `（設立に際して出資される財産の価額）\n`;
  doc += `第１条　当会社の設立に際して出資される財産の価額は、金${(basicInfo.capital || 0).toLocaleString()}円とする。\n\n`;

  if (isKabushiki) {
    doc += `（設立時発行株式数）\n`;
    doc += `第２条　当会社の設立に際して発行する株式の総数は、${(shareInfo?.issuedShares || 0).toLocaleString()}株とする。\n\n`;

    doc += `（設立時取締役）\n`;
    doc += `第３条　当会社の設立時取締役は、次のとおりとする。\n`;
    directors.forEach(d => {
      if (d.isRepresentative) {
        doc += `　代表取締役　${d.name}\n`;
      } else {
        doc += `　取締役　　　${d.name}\n`;
      }
    });
    if (officerInfo?.auditor) {
      doc += `　監査役　　　${officerInfo.auditor}\n`;
    }
    doc += `\n`;

    doc += `（設立時代表取締役）\n`;
    doc += `第４条　当会社の設立時代表取締役は、次のとおりとする。\n`;
    if (representativeDirector) {
      doc += `　${representativeDirector.name}\n`;
    }
    doc += `\n`;
  }

  doc += `（最初の事業年度）\n`;
  const annexArticle = isKabushiki ? (officerInfo?.auditor ? 5 : 5) : 2;
  doc += `第${annexArticle}条　当会社の最初の事業年度は、会社成立の日から${fiscalEndMonthStr}月末日までとする。\n\n`;

  doc += `（法令の準拠）\n`;
  doc += `第${annexArticle + 1}条　本定款に定めのない事項は、すべて会社法その他の法令の定めるところによる。\n\n`;

  doc += `　以上、${companyFullName}設立のため、この定款を作成し、発起人（社員）全員がこれに記名押印する。\n\n`;

  const today = new Date();
  const dateStr = basicInfo.establishmentDate || `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
  doc += `${dateStr}\n\n`;

  if (representativeDirector) {
    doc += `発起人（代表取締役）　${representativeDirector.name}　　㊞\n`;
    doc += `住所：${representativeDirector.address}\n\n`;
  }
  otherDirectors.forEach(d => {
    doc += `発起人（取締役）　　　${d.name}　　㊞\n`;
    doc += `住所：${d.address}\n\n`;
  });

  return doc;
}
