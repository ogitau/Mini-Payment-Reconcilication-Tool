export function reconcileData(internal, provider) {
    console.log('=== RECONCILIATION DEBUG START ===');
    console.log('Internal data length:', internal.length);
    console.log('Provider data length:', provider.length);
    console.log('Sample internal row:', internal[0]);
    console.log('Sample provider row:', provider[0]);
    
    // Find the transaction reference field name
    const getTransactionRefField = (data) => {
      if (!data || data.length === 0) return null;
      const sampleRow = data[0];
      const possibleFields = [
        'transaction_reference', 'transaction_reference_id', 'reference', 'ref', 
        'transaction_id', 'id', 'transaction_ref', 'reference_id'
      ];
      
      for (const field of possibleFields) {
        if (sampleRow.hasOwnProperty(field)) {
          console.log('Found transaction reference field:', field);
          return field;
        }
      }
      
      console.log('Available fields in sample row:', Object.keys(sampleRow));
      return null;
    };
    
    const internalRefField = getTransactionRefField(internal);
    const providerRefField = getTransactionRefField(provider);
    
    // if (!internalRefField || !providerRefField) {
    //   console.log('No transaction reference field found in either dataset');
    //   return { matched: [], onlyInternal: internal, onlyProvider: provider };
    // }
    
    // Clean and normalize the reference values
    const cleanReference = (value) => {
      if (value === null || value === undefined) return '';
      return String(value).trim().toLowerCase();
    };
    
    const internalMap = new Map();
    const providerMap = new Map();
    
    // Build maps with cleaned references
    internal.forEach((row, index) => {
      const ref = cleanReference(row[internalRefField]);
      if (ref) {
        internalMap.set(ref, row);
        if (index < 3) console.log(`Internal ref ${index}: "${ref}" (original: "${row[internalRefField]}")`);
      }
    });
    
    provider.forEach((row, index) => {
      const ref = cleanReference(row[providerRefField]);
      if (ref) {
        providerMap.set(ref, row);
        if (index < 3) console.log(`Provider ref ${index}: "${ref}" (original: "${row[providerRefField]}")`);
      }
    });
    
    console.log('Internal Map size:', internalMap.size);
    console.log('Provider Map size:', providerMap.size);
    console.log('Sample internal keys:', Array.from(internalMap.keys()).slice(0, 5));
    console.log('Sample provider keys:', Array.from(providerMap.keys()).slice(0, 5));
    
    // Check for potential matches
    const internalKeys = Array.from(internalMap.keys());
    const providerKeys = Array.from(providerMap.keys());
    
    console.log('Checking for potential matches...');
    let potentialMatches = 0;
    internalKeys.forEach(key => {
      if (providerKeys.includes(key)) {
        console.log('Potential match found:', key);
        potentialMatches++;
      }
    });
    console.log('Total potential matches:', potentialMatches);
  
    const matched = [];
    const onlyInternal = [];
    const onlyProvider = [];
  
    internalMap.forEach((intVal, ref) => {
      if (providerMap.has(ref)) {
        const provVal = providerMap.get(ref);
        console.log('Match found for reference:', ref);
        matched.push({ ...intVal, matchedWith: provVal });
        providerMap.delete(ref);
      } else {
        onlyInternal.push(intVal);
      }
    });
  
    providerMap.forEach(provVal => onlyProvider.push(provVal));
    
    console.log('=== RECONCILIATION RESULTS ===');
    console.log('- Matched:', matched.length);
    console.log('- Only Internal:', onlyInternal.length);
    console.log('- Only Provider:', onlyProvider.length);
    console.log('=== RECONCILIATION DEBUG END ===');
  
    return { matched, onlyInternal, onlyProvider };
  }