import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadDocument } from 'src/services/docs';
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';

const questionsWithHeadings = [
  {
    heading: 'Taxpayer Details',
    questions: [
      { question: 'TRN', type: 'text' },
      { question: 'Taxable Person Name in English', type: 'text' },
      { question: 'Entity Type', type: 'text' },
      { question: 'Primary Business', type: 'text' }
    ]
  },
  {
    heading: 'Address Details',
    questions: [
      { question: 'Country', type: 'text' },
      { question: 'Building Name & Number', type: 'text' },
      { question: 'Street', type: 'text' },
      { question: 'Area', type: 'text' },
      { question: 'Emirate', type: 'text' },
      { question: 'City', type: 'text' },
      { question: 'Country Code', type: 'text' },
      { question: 'Mobile Number', type: 'text' },
      { question: 'Email ID', type: 'text' }
    ]
  },
  {
    heading: 'Taxable Person Information',
    questions: [
      { question: 'Is the above information correct?', type: 'yesno' },
      {
        question: 'Is the Taxable Person a partner in one or more Unincorporated Partnerships?',
        type: 'yesno'
      },
      {
        question: 'Is the Tax Return being completed by a Government Entity, Government Controlled Entity, Extractive Business Or Non-Extractive Natural Resource Business?',
        type: 'yesno'
      },
      {
        question: "What is Taxable Person's Revenue derived during the Tax Period? (AED)",
        type: 'number'
      },
      {
        question: "Has the Taxable Person's Financial Statements been prepared under the cash or accrual basis?",
        type: 'text'
      },
      {
        question: 'Does the Taxable person conduct more than one Business Or Business Activity?',
        type: 'yesno'
      },
      {
        question: 'Is the Taxable Person a member Of a Multinational Enterprise Group?',
        type: 'yesno'
      },
      {
        question: 'Is the Taxable Person tax resident in a foreign jurisdiction under an applicable Taxation Agreement?',
        type: 'yesno'
      },
      {
        question: 'Is the Taxable Person incorporated or otherwise established or recognised under the laws of the UAE or under the laws Of a Free Zone?',
        type: 'yesno'
      },
      {
        question: 'Is the Taxable Person tax resident in a foreign jurisdiction under an applicable Double Taxation Agreement?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Free Zones',
    questions: [
      {
        question: 'Is the taxpayer incorporated, established, or otherwise registered in a Free Zone?',
        type: 'yesno'
      },
      {
        question: 'Does the Taxable Person conduct more than one Business or Business Activity?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Realisation Basis Election',
    questions: [
      {
        question: 'Would the Taxable Person like to elect to use the realisation basis?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Transitional Rules',
    questions: [
      {
        question: 'Is the Taxable Person making an election to adjust Taxable Income for gains recognised on any Qualifying Property owned prior to the first Tax Period?',
        type: 'yesno'
      },
      {
        question: 'Is the Taxable Person making an election to adjust Taxable Income for gains recognised on all Qualifying Intangible Assets prior to the first Tax Period?',
        type: 'yesno'
      },
      {
        question: 'Is the Taxable Person making an election to adjust Taxable Income for gains and losses on all Qualifying Financial Assets and/or Qualifying Financial Liabilities owned prior to the first Tax Period?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Corporate Tax Return',
    questions: [{ question: 'Revenue in the Tax Period (AED)', type: 'number' }]
  },
  {
    heading: 'Transfers within a Qualifying Group',
    questions: [
      {
        question: 'Did the Taxable Person transfer any assets or liabilities to a member of the same Qualifying Group during the Tax Period?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Business Restructuring Relief',
    questions: [
      {
        question: 'Did the Taxable Person transfer a Business or an independent part of a Business during the Tax Period under which Business Restructuring Relief may apply?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Foreign Permanent Establishment Income',
    questions: [
      {
        question: 'Does the Taxable Person have any Foreign Permanent Establishments?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Statement of Profit and Loss',
    questions: [
      { question: 'Operating Revenue (AED)', type: 'number' },
      {
        question: 'Expenditure incurred in deriving operating revenue (AED)',
        type: 'number'
      },
      { question: 'Gross Profit / Loss (AED)', type: 'number' },
      { question: 'Non-operating Expense', type: 'number' },
      { question: 'Salaries, wages and related charges (AED)', type: 'number' },
      { question: 'Depreciation and amortization (AED)', type: 'number' },
      { question: 'Fines and Penalties (AED)', type: 'number' },
      { question: 'Donations (AED)', type: 'number' },
      { question: 'Client entertainment expenses (AED)', type: 'number' },
      { question: 'Other expenses (AED)', type: 'number' },
      { question: 'Non-operating expenses (Other below) (AED)', type: 'number' },
      { question: 'Non-operating Revenue', type: 'number' },
      { question: 'Dividends received (AED)', type: 'number' },
      { question: 'Other non-operating revenue (AED)', type: 'number' },
      { question: 'Other items', type: 'number' },
      { question: 'Interest Income (AED)', type: 'number' },
      { question: 'Interest Expenditure (AED)', type: 'number' },
      { question: 'Net Interest Income / (Expense) (AED)', type: 'number' },
      { question: 'Gains on Disposal Of Assets (AED)', type: 'number' },
      { question: 'Losses on Disposal of Assets (AED)', type: 'number' },
      {
        question: 'Net gains / (losses) disposal of assets (AED)',
        type: 'number'
      },
      { question: 'Foreign exchange gains (AED)', type: 'number' },
      { question: 'Foreign exchange losses (AED)', type: 'number' },
      {
        question: 'Net Gains / (losses) on foreign exchange (AED)',
        type: 'number'
      },
      { question: 'Net (AED)', type: 'number' }
    ]
  },
  {
    heading: 'Statement of Other Comprehensive Income',
    questions: [
      {
        question: 'Losses that will not be reclassified to the income statement (AED)',
        type: 'number'
      },
      {
        question: 'Income that may be reclassified to the income statement (AED)',
        type: 'number'
      },
      {
        question: 'Income that will not be reclassified to the income statement (AED)',
        type: 'number'
      },
      {
        question: 'Losses that may be reclassified to the income statement (AED)',
        type: 'number'
      },
      {
        question: 'Other income reported in other comprehensive income for the year, net of tax (AED)',
        type: 'number'
      },
      {
        question: 'Other losses reported in other comprehensive income for the year, net of tax (AED)',
        type: 'number'
      },
      { question: 'Total comprehensive income for the year (AED)', type: 'number' }
    ]
  },
  {
    heading: 'Statement of Financial Position',
    questions: [
      { question: 'Total current assets (AED)', type: 'number' },
      { question: 'Non-current Assets', type: 'number' },
      { question: 'Property, plant and equipment (AED)', type: 'number' },
      { question: 'Intangible assets (AED)', type: 'number' },
      { question: 'Financial assets (AED)', type: 'number' },
      { question: 'Total non-current assets (AED)', type: 'number' },
      { question: 'Total assets (AED)', type: 'number' },
      { question: 'Total current liabilities (AED)', type: 'number' },
      { question: 'Total non-current liabilities (AED)', type: 'number' },
      { question: 'Total liabilities (AED)', type: 'number' },
      { question: 'Equity', type: 'number' },
      { question: 'Share capital (AED)', type: 'number' },
      { question: 'Retained earnings (AED)', type: 'number' },
      { question: 'Other equity (AED)', type: 'number' },
      { question: 'Total equity (AED)', type: 'number' },
      { question: 'Total equity and liabilities (AED)', type: 'number' },
      { question: 'Average number of employees during the Tax Period', type: 'number' }
    ]
  },
  {
    heading: 'Audit',
    questions: [
      {
        question: 'Have the Financial Statements been audited?',
        type: 'yesno'
      },
      { question: 'What was the audit opinion?', type: 'text' },
      { question: 'What is the name of the auditor?', type: 'text' }
    ]
  },
  {
    heading: 'Accounting Adjustments and Exempt Income',
    questions: [
      {
        question: 'Does the Taxable Person account for any investments under the Equity Method of Accounting?',
        type: 'yesno'
      },
      {
        question: 'Has the Taxable Person recognised any realised or unrealised gains or losses in the Financial Statements that will not subsequently be recognised in the Income Statement?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Transitional Adjustments',
    questions: [
      {
        question: 'Has the Taxable Person held any Qualifying Immovable Property, Qualifying Intangible Assets or Qualifying Financial Assets or Qualifying Financial Liabilities during the Tax Period?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Exempt Income',
    questions: [
      {
        question: 'Has the Taxable Person received any Dividends or Profit distributions from a UAE Resident Person?',
        type: 'yesno'
      },
      {
        question: 'Has the person derived Income or Losses from a Participating Interest?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Other Adjustments',
    questions: [
      {
        question: 'Non-deductible Entertainment expenditure (AED)',
        type: 'number'
      },
      { question: 'Pension contributions (AED)', type: 'number' },
      {
        question: 'Charitable donations made to entities that are not Qualifying Public Benefit Entities (AED)',
        type: 'number'
      },
      {
        question: 'Expenditure incurred in deriving Exempt Income other than Interest expenditure (AED)',
        type: 'number'
      },
      {
        question: 'Dividends, profit distributions or benefits of a similar nature to an owner Of the Taxable Person (AED)',
        type: 'number'
      },
      {
        question: 'Expenses not wholly and exclusively incurred for the purposes Of the Business (AED)',
        type: 'number'
      },
      { question: 'Other non-deductible expenditure (AED)', type: 'number' }
    ]
  },
  {
    heading: 'Adjustments for Interest Income / Expenditure',
    questions: [
      {
        question: 'Has the Taxable Person incurred Net Interest in the current Tax Period which together with any Net Interest Expenditure carried forward exceeds AED 12 million?',
        type: 'yesno'
      },
      {
        question: 'Does the Taxable Person wish to deduct any brought forward Net Interest Expenditure in the Current Tax Period?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Transactions with Related Parties and Connected Persons',
    questions: [
      {
        question: 'Were there any transactions with Related Parties in the current Tax Period?',
        type: 'yesno'
      },
      {
        question: 'Did the aggregate value of all transactions with Related Parties exceed AED 40 million?',
        type: 'yesno'
      },
      {
        question: "Additions as a result of adjustments to transactions which were not at arm's length (AED)",
        type: 'number'
      },
      {
        question: "Reductions as a result of adjustments to transactions which were not at arm's length (AED)",
        type: 'number'
      },
      {
        question: 'Were there any gains / losses realised in the current Tax Period in relation to assets/liabilities previously received from a Related Party at a non-arms length price?',
        type: 'yesno'
      },
      {
        question: 'Were there any transactions with Connected Persons in the current Tax Period?',
        type: 'yesno'
      },
      {
        question: 'Did the aggregate value of transactions with at least one Connected Person exceed AED 500,000?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Adjustments for Income and Expenditure derived from a Qualifying Investment Fund',
    questions: [
      {
        question: 'Has the Taxable Person been an Investor in a Qualifying Investment Fund in the Current Tax Period or any previous Tax Period?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Other Adjustments',
    questions: [
      { question: 'Any other adjustments not captured above?', type: 'yesno' }
    ]
  },
  {
    heading: 'Tax Liability and Tax Credits',
    questions: [
      {
        question: 'Taxable Income / (Tax Loss) before any Tax Loss (AED)',
        type: 'number'
      }
    ]
  },
  {
    heading: 'Tax Losses',
    questions: [
      {
        question: 'Does the Taxable Person wish to claim Tax Losses from, or Surrender Tax Losses to, a group entity?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Tax Calculations and Tax Credits',
    questions: [
      {
        question: 'Taxable Income / (Tax Loss) for the Tax Period (AED)',
        type: 'number'
      },
      { question: 'Corporate Tax Liability (AED)', type: 'number' },
      {
        question: 'Does the Taxable Person wish to use any available Tax Credits?',
        type: 'yesno'
      },
      { question: 'Corporate Tax Payable (AED)', type: 'number' }
    ]
  },
  {
    heading: 'Estimated / Provisional figures included in the CT Return',
    questions: [
      {
        question: 'Have any estimated figures been included in the Corporate Tax Return?',
        type: 'yesno'
      }
    ]
  },
  {
    heading: 'Declaration',
    questions: [
      { question: 'First Name', type: 'text' },
      { question: 'Last Name', type: 'text' },
      { question: 'Country code', type: 'text' },
      { question: 'Phone number', type: 'text' },
      { question: 'Date of submission', type: 'date' },
      {
        question: 'I confirm that the information provided in this Tax Return, including any schedules, is to the best of my knowledge complete and accurate at the date of submission.',
        type: 'checkbox'
      }
    ]
  }
];
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: '#333'
  } as React.CSSProperties,
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  } as React.CSSProperties,
  header: {
    backgroundColor: '#1a5276',
    color: 'white',
    padding: '20px 30px',
    marginBottom: '20px'
  } as React.CSSProperties,
  title: {
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 5px 0'
  } as React.CSSProperties,
  subtitle: {
    fontSize: '14px',
    opacity: '0.9',
    margin: '0'
  } as React.CSSProperties,
  form: {
    padding: '0 30px 30px'
  } as React.CSSProperties,
  section: {
    marginBottom: '30px'
  } as React.CSSProperties,
  sectionHeader: {
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1a5276'
  } as React.CSSProperties,
  questionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '20px'
  } as React.CSSProperties,
  question: {
    marginBottom: '15px'
  } as React.CSSProperties,
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#444'
  } as React.CSSProperties,
  required: {
    color: '#e74c3c',
    marginLeft: '4px'
  } as React.CSSProperties,
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    transition: 'border-color 0.3s'
  } as React.CSSProperties,
  textarea: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    minHeight: '80px',
    resize: 'vertical'
  } as React.CSSProperties,
  radioGroup: {
    display: 'flex',
    gap: '20px',
    marginTop: '5px'
  } as React.CSSProperties,
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    cursor: 'pointer'
  } as React.CSSProperties,
  radioInput: {
    marginRight: '8px'
  } as React.CSSProperties,
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px'
  } as React.CSSProperties,
  checkboxInput: {
    marginRight: '8px'
  } as React.CSSProperties,
  fileInput: {
    width: '100%',
    marginTop: '5px'
  } as React.CSSProperties,
  submitButton: {
    backgroundColor: '#1a5276',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '20px',
    float: 'right'
  } as React.CSSProperties,
  submitButtonHover: {
    backgroundColor: '#154360'
  } as React.CSSProperties
};

export default function DynamicTaxForm() {
  const [isLoading, setIsLoading ] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isHovered, setIsHovered] = useState(false);
const navigate = useNavigate();
  const handleChange = (question: string, value: string) => {
    setFormData((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const questionsArray = questionsWithHeadings.flatMap(section => 
        section.questions.map(q=> ({
            question:q.question,
            answer:formData[q.question] || ''
        }))
    );
    console.log(questionsArray);

    const formDataToSend = new FormData();
    formDataToSend.append('userId',localStorage.getItem('user_id'));
    formDataToSend.append('questions', JSON.stringify(questionsArray));
    formDataToSend.append('file', selectedFile);

    const response = await uploadDocument(formDataToSend);
    setIsLoading(false);
    if(response?.error) {
        toast.error('Some error occured please try again later');
    }else if(response?.success) {
        toast.success('Your document has been submitted successfully');
        navigate('/dashboards/crypto');
    }
    else {
        toast.error('An unknown network error has occured please try again later');
    }
    
};

  const renderInputField = (q: { question: string; type: string }) => {
    switch (q.type) {
      case 'yesno':
        return (
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name={q.question}
                value="Yes"
                checked={formData[q.question] === 'Yes'}
                onChange={() => handleChange(q.question, 'Yes')}
                style={styles.radioInput}
                required
              />
              Yes
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name={q.question}
                value="No"
                checked={formData[q.question] === 'No'}
                onChange={() => handleChange(q.question, 'No')}
                style={styles.radioInput}
                required
              />
              No
            </label>
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={formData[q.question] || ''}
            onChange={(e) => handleChange(q.question, e.target.value)}
            placeholder="Enter amount in AED"
            style={styles.input}
            required
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={formData[q.question] || ''}
            onChange={(e) => handleChange(q.question, e.target.value)}
            style={styles.input}
            required
          />
        );

      case 'checkbox':
        return (
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData[q.question] === 'true'}
              onChange={(e) =>
                handleChange(q.question, e.target.checked ? 'true' : 'false')
              }
              style={styles.checkboxInput}
              required
            />
            {q.question}
          </label>
        );

      case 'file':
        return (
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleChange(q.question, e.target.files[0].name);
              }
            }}
            style={styles.fileInput}
          />
        );

      default:
        return q.question.length > 80 ? (
          <textarea
            value={formData[q.question] || ''}
            onChange={(e) => handleChange(q.question, e.target.value)}
            placeholder="Your answer..."
            style={styles.textarea}
            required
          />
        ) : (
          <input
            type="text"
            value={formData[q.question] || ''}
            onChange={(e) => handleChange(q.question, e.target.value)}
            placeholder="Your answer..."
            style={styles.input}
            required
          />
        );
    }
  };

  // Combine button styles based on hover state
  const buttonStyle = {
    ...styles.submitButton,
    ...(isHovered ? styles.submitButtonHover : {})
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <div style={styles.header}>
          <h1 style={styles.title}>Corporate Tax Upload Form</h1>
          <p style={styles.subtitle}>Please fill out all required fields</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {questionsWithHeadings.map((section, i) => (
            <div key={i} style={styles.section}>
              <h2 style={styles.sectionHeader}>{section.heading}</h2>

              <div style={styles.questionsGrid}>
                {section.questions.map((q, idx) => (
                  <div key={idx} style={styles.question}>
                    <label style={styles.label}>
                      {q.question}
                      {q.type !== 'checkbox' && (
                        <span style={styles.required}>*</span>
                      )}
                    </label>
                    {renderInputField(q)}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={styles.section}>
            <h2 style={styles.sectionHeader}>Supporting Documents</h2>
            <p
              style={{
                fontSize: '14px',
                marginBottom: '0.5rem',
                color: '#555'
              }}
            >
              Please combine and upload all your tax-related documents in a
              single file. For example:
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                <li>Financial Statements</li>
                <li>
                  Documentation to support the market value of the Qualifying
                  Immovable Property at the start of the first tax period
                </li>
                <li>
                  Documentation to support the market value of Financial
                  Assets/Liabilities at the start of the first tax period
                </li>
                <li>Tax residency certificate in the foreign jurisdiction</li>
              </ul>
            </p>

            <div style={styles.question}>
              <label style={styles.label}>
                Upload Combined Tax Documents{' '}
                <span style={styles.required}>*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.zip"
                onChange={handleFileChange}
                style={{
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db'
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader/>:'Submit'}
          </button>
          <div style={{ clear: 'both' } as React.CSSProperties}></div>
        </form>
      </div>
    </div>
  );
}
