const questions = [
//Heading --- Taxpayer Details
'TRN',
'Taxable Person Name in English',
'Enitity Type',
'Primary Business',
//address-details
'Country',
'Building Name & Number',
'Street',
'Area',
'Emirate',
'City',
'Country Code',
'Mobile Number',
'Email ID',
//taxable-person-information
'Is the above information correct?',
'Is the Taxable Person a partner in one or more Unincorporated Partnerships?',
'Is the Tax Return being completed by a Governnwnt Entity, Government Controlled Entity, Extractive Business Or Non-Extractive Natural Resource Business ?',
"What is Taxable Person's Revenue derived during the Tax Period? (AED)",
"Has the Taxable Persal's Financial Statements been prepared under the cash or accrual basis?",
'Does the Taxable person conduct more than me Business Or Business Activity?',
'IS the Taxable Person a member Of a Multinational Enterprise Group?',
'IS the Taxable Person tax resideM a foreign jurisdction an appEcabIe Taxation Agreement?',
'Is the Taxable Person incorporated or otherwise established or recognised under the laws of the UAE or under the laws Of a Free Zone?'
,
'Is the Taxable Person tax resident in a foreign jurisdction Wlder an applicable Double Taxation Agreement?',
//free zones
'Is the taxpayer incorporated. estauished, Otherwise registered in a Free Zone?',
'Does the Taxable Person conduct more than Busüless or Business Activity?',
//election
//realisation-basis
'Would the Taxable Person like to elect to use the realisation basis?',
//transitional-rules
'Is the Taxable Person making an election to adjust Taxable Income for gains recognised on any Qualifying Property owned prior to the first Tax Period?,',
'Is the Taxable Person making an election to adjust Taxable Inconv tot gains recognised on all Qualifying Intangible Assets prior to the first Tax Period?',
'Is the Taxable Person making an election to adjust Taxable Income for gains and losses on au Oualifying Financial Assets and/or Oualitying Financial Liabilities owned prior to the first Tax Period?',
//Small Business Relief
//CORPORATE TAX RETURN
'Revenue in the Tax Period (AED)',
//transfers within a qualifying group
'Did the Taxable Person transfer any assets or uabdities to a member of the sanw Qualifying Group during the Tax Period?',
//business restructuring belief
'Did the Taxable Person transfer a Business or an independent part ot a Business during the Tax Period under which Business Restructuring Relief may apply?',
//foreign permanent establishment income
'Does the Taxable Person have any Foreign Permanent EstabWvnents?',
//Account schedules
//statement of profit and loss
'Operating Revenue CAED)',
'Expenditure incurred in deriving operating revenue CAED)',
'Gross Profit / Loss (AED)',
'Nort •operating Expense',
'Salaries. wages and related charges (AED)',
'and arnortisation (AED)',
'Fines and Penalties (AED)',
'Donations (AED)',
'Client entertainment expenses CAED)',
'Other expenses (AED)',
'Non-operating expenses Other below) (AED)',
'Non-operating Revenue',
'Dividends received (AED)',
'Other non-operating revenue (AED)',
'Other items',
'Interest Income (AED)',
'interest Expenditure (AED)',
'Net Interest Incorne / (Expense) (AED)',
'Gains on Disposal Ot Assets (AED)',
'Losses on Disposal ot Assets (AED)',
'Net gains / (losses) disposal Of assets CAED)',
'Foreign exchange gains (AED)',
'Foreign exchange losses (AED)',
'Net Gains / (losses) on foreign exchange (AED)',
'Net (AED)',
//Statement of other comprehensive income
'Losses that will not be reclassified to the income statement (AED)',
'Income that may be reclassified to the income statement (AED)',
'Income that will not be reclassified to the income statement (AED)',
'Losses that may be reclassified to the inconte statement (AED)',
'Other income reported in other comprehensive income tor the year. net ot tax (AED)',
'Other losses reported in other cornprehensive inconte tor the year. net ot tax (AED)',
'TOW comprehensive the year CAED)',
//statement of financial position
'Total current assets (AED)',
'ten-current Assets',
'Property, plant and equipment CAED)',
'Intangible assets (AED)',
'Financial assets CAEO)',
'Total non-current assets (AED)',
'Total assets CAED)',
'Total current liabilities (AED)',
'Total non-current liabilities (AED)',
'Total liabilities (AED)',
'Equity',
'Share capital CAED)',
'Retained earnings (AED)',
'other equity (AED)',
'Total equity (AED)',
'equity and liabilities (AED)',
'Average number Of during the Tax',
//audit
'Have the Financial Statements been audited?',
'What was the audit opinion?',
'What is the name of the auditor?',
//acounting adjustments and exempt income
//accounting income
'Does the Taxable Person account for any investments under the Equity Method of Accounting?',
'Has the Taxable Person recognised any realised or unrealised gains or losses in the Financial Statements that will not subsequently be recognised in the Income Statement?',
//transitional adjustments
'Has the Taxable Person held any Qualifying Immovable Property, Qualifying Intangible Assets or Qualifying Financial Assets or Qualifying Financial Liabilities during the Tax Period?',
//Exempt Income
'Has the Taxable Person received any Dividerxis or Profit distributions from a UAE Resident Person?',
'Has the person deriwd Income or Losses from a Participating Interest?',
//other adjustments
'Non•dedRtibIe Entertainrnent expenditure (AED)',
'Pension contributions (AED) ',
'Charitable donations made to entities that are not Qualifying Public Benefit Entities (AED) ',
'Expenditure irxurred in deriving Exempt Income other than Interest expenditure CAED)',
'Dividends, profit distributions or benefits Of a similar nature to an owner Of the Taxable Person (AED)',
'Expenses not and exclusively incurred for the purposes Of the Business (AED)',
'her non-deductible expenditure (AED)',
//Adjustments for Interest Income / Expenditure
'Has the Taxable Person incurred Net Interest in the current Tax Period which together with any Net Interest Expenditure carried forward exceeds AED 12 million',
'the Taxable wish to deduct any brought forward Net Interest Expenditure in the Current Tax Period?',
//Transactions with Related Parties and Connected Persons

'Were there my transactions with Related Parties in the current Tax Period?',
'Did the aggregate value of all transactions with Related Parties exceed AED 40 rNlIion?',
"Additions as a result Of to trmsactions which were not at arm's kngth(AED)",
"as a result Of adjustments to trmsactions which were not at arm's mgth (AED)",
'Were there my gains / losses realised in the current Tax Period in relation to assets/habdities previously received from a Related Party at a non-arms length price?',
'Were there any transactions with Connected Persons in the current Tax Period?',
'Did the aggregate value Ot transactions with at least one Connected exceed AEO 500000?',
//Adjustments for Income and Expenditure derived from a Qualifying Investment Fund
'Has the Taxable person been an Investor in a Qualitying Investment Fund in the Current Tax Period Or any Tax',
//Other Adjustments

'Any other adjustments not captured above?',
//Tax Liability and Tax Credits
//Taxable Income
'Taxable Income / (Tax Loss) before any Tax LOSS (AED)',
//Tax Losses
'Does the Taxable PerSM wish to claim Tax Losses from. Or Swrender Tax Losses to. group entity?',
//Tax Calculations and Tax Credits,
'Taxable / (Tax Loss) for tt•w Tax Period (AED)',
'Corporate Tax Liability (AED)',
'Does the Taxable Person wish to use any available Tax Credits?',
'Corporate Tax CAED)',
//Estimated / Provisional figures included in the CT Return
'Have any estimated figures been included in the Corporate Tax Return?',
//additional attachments (file fields)
'FinancW Statements',
'Docurnentation to support the market •aue of the Qualifying Imtnovable', ',Property at the start of the first tax period',
'Docurnentation to support the market Of the FOnCiaI Assets/Liabilities at the Start Of the first tax period',
'Tax residency certificate in the foreign jurisdiction',

//Declaration
'First Name',
'Last Name',
'Country code',
'phone number',
'date of submission',
'I confirm the below Declaratim:I confirm I have been granted full authority to complete this Tax Return on behalf of the relevant Taxable Person-, confirm that the information provided in this Tax Return, including any schedules. is to the best of my knowledge complete and accurate at the date of submission.'
]