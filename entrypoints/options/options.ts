const domainsInput = document.getElementById('domains') as HTMLTextAreaElement;
const saveButton = document.getElementById('save') as HTMLButtonElement;

async function loadOptions() {
  const domains = await storage.getItem<string[]>('local:userDomains');
  domainsInput.value = domains ? domains.join(', ') : '';
}

async function saveOptions() {
  const domains = domainsInput.value.split(/[,\n]+/).map(s => s.trim()).filter(s => s !== '');
  await storage.setItem('local:userDomains', domains);
}

document.addEventListener('DOMContentLoaded', loadOptions);
saveButton.addEventListener('click', saveOptions);
