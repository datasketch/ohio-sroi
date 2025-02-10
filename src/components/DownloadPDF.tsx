import { Page, Text, View, Document, PDFDownloadLink, StyleSheet, Image } from '@react-pdf/renderer';
import hexRgb from 'hex-rgb';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#1a1a1a',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 12,
    color: '#2a2a2a',
    fontWeight: 'bold',
  },
  outcomeSection: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    color: '#4a4a4a',
    lineHeight: 1.4,
  },
  table: {
    marginTop: 8,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    minHeight: 35,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    minHeight: 32,
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    textAlign: 'left',
  },
  headerCell: {
    flex: 1,
    padding: 8,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#2a2a2a',
  },
  cellWide: {
    flex: 3,
  },
  cellNarrow: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  stakeholderText: {
    fontSize: 14,
    color: '#2a2a2a',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  valueText: {
    fontSize: 12,
    color: '#4a4a4a',
    marginLeft: 8,
    marginTop: 2,
  },
  costsSection: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  numbersSection: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
  },
  subRow: {
    marginLeft: 16,
    fontSize: 9,
    color: '#666666',
  },
  formula: {
    fontSize: 9,
    padding: 8,
    color: '#666666',
    fontStyle: 'italic',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    objectFit: 'contain',
  },
  date: {
    fontSize: 10,
    color: '#666666',
  },
  banner: {
    width: '100%',
    height: 120,
    objectFit: 'cover',
    marginTop: 20,
  },
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

const MyPDF = ({ data, color }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo and Date */}
      <View style={styles.header}>
        {data.outcome.logo && (
          <Image src={data.outcome.logo} style={styles.logo} />
        )}
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </Text>
      </View>

      {/* Banner at the bottom */}
      {data.outcome.banner && (
        <Image src={data.outcome.banner} style={styles.banner} />
      )}

      <Text style={[styles.title, { color }, { marginTop: 20 }]}>Calculator Results</Text>

      {/* SROI Summary */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { color }]}>Company</Text>
          <Text style={[styles.headerCell, { color }]}>Maximum</Text>
          <Text style={[styles.headerCell, { color }]}>Minimum</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{data.outcome.title}</Text>
          <Text style={styles.tableCell}>{formatCurrency(data.outcome.socialValueMax)}</Text>
          <Text style={styles.tableCell}>{formatCurrency(data.outcome.socialValueMin)}</Text>
        </View>
      </View>

      {/* General Information Table */}
      {data.generalInformation.map((section, i) => (
        <View key={i} style={styles.section}>
          <View style={{ flexDirection: 'column', marginBottom: 8 }}>
            <Text style={[styles.subtitle, { color }]}>{section.title}</Text>
            <View style={{ flexDirection: 'column' }}>
              {section.totalValue && (
                <Text style={{ fontSize: 12, color: '#4a4a4a' }}>
                  Total value: {formatCurrency(section.totalValue)}
                </Text>
              )}
              {section.totalValueMin && (
                <Text style={{ fontSize: 12, color: '#4a4a4a' }}>
                  Min total value: {formatCurrency(section.totalValueMin)}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.cellWide, { color }]}>Stakeholders/Description</Text>
              <Text style={[styles.headerCell, styles.cellNarrow, { color }]}>Value</Text>
              <Text style={[styles.headerCell, styles.cellNarrow, { color }]}>Min Value</Text>
            </View>
            {section.rows.map((row, j) => (
              <View key={j}>
                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, styles.cellWide]}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{row.stakeholders}</Text>
                    <Text style={{ fontSize: 10 }}>{row.description}</Text>
                  </View>
                  <Text style={[styles.tableCell, styles.cellNarrow]}>{formatCurrency(row.value)}</Text>
                  <Text style={[styles.tableCell, styles.cellNarrow]}>{row.valueMin ? formatCurrency(row.valueMin) : '-'}</Text>
                </View>
                {row?.rows?.length > 0 && (
                  <View style={{ marginLeft: 20 }}>
                    {row.rows.map((subRow, k) => (
                      <View key={k} style={styles.tableRow}>
                        <View style={[styles.tableCell, styles.cellWide]}>
                          <Text style={styles.subRow}>└ {subRow.description}</Text>
                        </View>
                        <Text style={[styles.tableCell, styles.cellNarrow]}>{formatCurrency(subRow.value)}</Text>
                        <Text style={[styles.tableCell, styles.cellNarrow]}>-</Text>
                      </View>
                    ))}
                    <Text style={styles.formula}>Formula: {row.formula_str}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Costs Table */}
      {data.whatAreTheCosts && data.whatAreTheCosts.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.subtitle, { color }]}>What are the costs?</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.cellWide, { color }]}>Description</Text>
              <Text style={[styles.headerCell, styles.cellNarrow, { color }]}>Value</Text>
            </View>
            {data.whatAreTheCosts.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.cellWide]}>{item.description}</Text>
                <Text style={[styles.tableCell, styles.cellNarrow]}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Numbers Table */}
      <View style={styles.section}>
        <Text style={[styles.subtitle, { color }]}>What are the numbers?</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerCell, styles.cellWide, { color }]}>Description</Text>
            <Text style={[styles.headerCell, styles.cellNarrow, { color }]}>Value</Text>
            <Text style={[styles.headerCell, styles.cellNarrow, { color }]}>Min Value</Text>
          </View>
          {data.whatAreTheNumbers.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.cellWide]}>{item.description}</Text>
              <Text style={[styles.tableCell, styles.cellNarrow]}>
                {item.unit === 'currency' ? formatCurrency(item.value) : item.value}
              </Text>
              <Text style={[styles.tableCell, styles.cellNarrow]}>
                {item.valueMin ? (item.unit === 'currency' ? formatCurrency(item.valueMin) : item.valueMin) : '-'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default function DownloadPDF({ data, color }) {
  return (
    <PDFDownloadLink
      document={<MyPDF data={data} color={color} />}
      fileName="calculator-results.pdf"
      className="flex items-center gap-x-2 w-full py-2 px-4 rounded-lg justify-center hover:text-white mt-5"
      style={{
        backgroundColor: hexRgb(color, { format: 'css', alpha: 0.05 }),
        border: `1px solid ${color}`,
        color: color,
        textDecoration: 'none'
      }}
    >
      {({ loading }) => (
        <>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 11L12 17L18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 21H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {loading ? 'Loading...' : 'Download'}
        </>
      )}
    </PDFDownloadLink>
  );
}
