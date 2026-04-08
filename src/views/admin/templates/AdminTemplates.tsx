import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import type { RootState } from '@/store/rootReducer';
import { fetchAdminTemplates, deleteTemplate } from '@/store/actions/templateActions';
import { ROUTES } from '@/routes/routePaths';
import { Button, Modal, Alert, Spinner, EmptyState } from '@/components/ui';
import TemplateFilters from './components/TemplateFilters';
import TemplateGrid from './components/TemplateGrid';
import type { Template } from '@/types/template.types';

const AdminTemplates: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { templates, loading, error } = useSelector((s: RootState) => s.templateReducer);
  const [searchTerm,    setSearchTerm]    = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => { dispatch(fetchAdminTemplates()); }, [dispatch]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return templates;
    return templates.filter((t: Template) =>
      t.name.toLowerCase().includes(q) ||
      (t.tags ?? []).join(' ').toLowerCase().includes(q)
    );
  }, [templates, searchTerm]);

  const handleDelete = async (id: number) => {
    setDeleteLoading(true);
    try { await dispatch(deleteTemplate(id)); }
    finally { setDeleteLoading(false); setDeleteConfirm(null); }
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header__title">Resume Templates</h1>
          <p className="page-header__sub">{templates.length} template{templates.length !== 1 ? 's' : ''} total</p>
        </div>
        <Button variant="primary" to={ROUTES.ADMIN_TEMPLATE_CREATE}
          style={{ background: 'var(--clr-warning)', borderColor: 'var(--clr-warning)' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Template
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <TemplateFilters searchTerm={searchTerm} onSearch={setSearchTerm} />

      {loading ? (
        <Spinner color="orange" text="Loading templates…" />
      ) : filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={<svg width="26" height="26" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
            iconBg="var(--clr-warning-bg)" iconColor="var(--clr-warning)"
            title={searchTerm ? `No results for "${searchTerm}"` : 'No templates yet'}
            sub="Add your first resume template to get started."
            ctaLabel={!searchTerm ? '+ Add Template' : undefined}
            ctaTo={!searchTerm ? ROUTES.ADMIN_TEMPLATE_CREATE : undefined}
          />
        </div>
      ) : (
        <TemplateGrid templates={filtered} onDelete={setDeleteConfirm} />
      )}

      {deleteConfirm !== null && (
        <Modal
          title="Delete template?"
          body="This will permanently remove the template and its HTML. This cannot be undone."
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  );
};

export default AdminTemplates;
