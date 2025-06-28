export function reconcileData(internal, provider) {
    console.log('Reconciliation input - Internal:', internal);
    console.log('Reconciliation input - Provider:', provider);
    
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
    
    if (!internalRefField || !providerRefField) {
      console.error('Could not find transaction reference field in one or both files');
      return { matched: [], onlyInternal: internal, onlyProvider: provider };
    }
    
    const internalMap = new Map(internal.map(row => [row[internalRefField], row]));
    const providerMap = new Map(provider.map(row => [row[providerRefField], row]));
    
    console.log('Internal Map size:', internalMap.size);
    console.log('Provider Map size:', providerMap.size);
    console.log('Sample internal keys:', Array.from(internalMap.keys()).slice(0, 5));
    console.log('Sample provider keys:', Array.from(providerMap.keys()).slice(0, 5));
  
    const matched = [];
    const onlyInternal = [];
    const onlyProvider = [];
  
    internalMap.forEach((intVal, ref) => {
      if (providerMap.has(ref)) {
        const provVal = providerMap.get(ref);
        matched.push({ ...intVal, matchedWith: provVal });
        providerMap.delete(ref);
      } else {
        onlyInternal.push(intVal);
      }
    });
  
    providerMap.forEach(provVal => onlyProvider.push(provVal));
    
    console.log('Reconciliation results:');
    console.log('- Matched:', matched.length);
    console.log('- Only Internal:', onlyInternal.length);
    console.log('- Only Provider:', onlyProvider.length);
    console.log('- Only Internal data:', onlyInternal);
    console.log('- Only Provider data:', onlyProvider);
  
    return { matched, onlyInternal, onlyProvider };
  }