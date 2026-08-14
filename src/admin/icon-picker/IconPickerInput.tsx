import { forwardRef, useMemo, useState } from 'react';
import { Field } from '@strapi/design-system';
import { icons, Search, Trash2, type LucideIcon } from 'lucide-react';
import { fab, type IconDefinition } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import type { IconPickerValue } from './types';

type IconPickerInputProps = {
  disabled?: boolean;
  error?: string;
  hint?: React.ReactNode;
  label?: React.ReactNode;
  labelAction?: React.ReactNode;
  name: string;
  onChange: (eventOrPath: React.ChangeEvent<unknown> | string, value?: IconPickerValue | null) => void;
  required?: boolean;
  value?: IconPickerValue | null;
};

const iconEntries = Object.entries(icons) as Array<[string, LucideIcon]>;
const popularBrands = ['linkedin', 'facebook', 'instagram', 'x-twitter', 'youtube', 'tiktok', 'threads', 'whatsapp', 'pinterest', 'github', 'discord', 'twitch'];
const brandEntries = Array.from(
  new Map(Object.values(fab).map((brand) => [brand.iconName, brand])).values(),
).sort((left, right) => {
  const leftRank = popularBrands.indexOf(left.iconName);
  const rightRank = popularBrands.indexOf(right.iconName);
  if (leftRank >= 0 || rightRank >= 0) return (leftRank < 0 ? Number.MAX_SAFE_INTEGER : leftRank) - (rightRank < 0 ? Number.MAX_SAFE_INTEGER : rightRank);
  return left.iconName.localeCompare(right.iconName);
}) as IconDefinition[];
const brandColors: Record<string, string> = {
  facebook: '#1877F2', github: '#181717', instagram: '#E4405F', linkedin: '#0A66C2',
  pinterest: '#BD081C', threads: '#000000', tiktok: '#000000', twitch: '#9146FF',
  'x-twitter': '#000000', youtube: '#FF0000', whatsapp: '#25D366', discord: '#5865F2',
};
const DEFAULT_COLOR = '#004b93';
const DEFAULT_SIZE = 32;
const DEFAULT_STROKE = 2;

const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
`;

const PreviewIcon = styled.div`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  flex: 0 0 64px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.neutral100};
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: minmax(150px, 1fr) repeat(2, minmax(100px, 140px));
  gap: 12px;
  padding: 0 16px 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Control = styled.label`
  display: grid;
  gap: 6px;
  color: ${({ theme }) => theme.colors.neutral800};
  font-size: 12px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 4px;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.neutral800};
  background: ${({ theme }) => theme.colors.neutral0};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: 1px;
  }
`;

const ColorRow = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 8px;

  input[type='color'] {
    width: 42px;
    height: 40px;
    padding: 3px;
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.neutral0};
  }
`;

const Picker = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.neutral200};
  padding: 16px;
  background: ${({ theme }) => theme.colors.neutral100};
`;

const SearchBox = styled.div`
  position: relative;
  margin-bottom: 12px;

  svg {
    position: absolute;
    top: 11px;
    left: 12px;
    color: ${({ theme }) => theme.colors.neutral500};
  }

  input {
    padding-left: 40px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 8px;
  max-height: 340px;
  overflow: auto;
`;

const IconButton = styled.button<{ $selected: boolean }>`
  display: grid;
  place-items: center;
  gap: 7px;
  min-height: 82px;
  padding: 9px 6px;
  border: 1px solid ${({ theme, $selected }) => $selected ? theme.colors.primary600 : theme.colors.neutral200};
  border-radius: 4px;
  color: ${({ theme, $selected }) => $selected ? theme.colors.primary700 : theme.colors.neutral700};
  background: ${({ theme, $selected }) => $selected ? theme.colors.primary100 : theme.colors.neutral0};
  cursor: pointer;

  span {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 10px;
    white-space: nowrap;
  }

  &:hover, &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary600};
  }
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 36px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 4px;
  padding: 7px 12px;
  color: ${({ theme }) => theme.colors.neutral700};
  background: ${({ theme }) => theme.colors.neutral0};
  cursor: pointer;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

function readableName(name: string) {
  return name.replace(/-/g, ' ').replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
}

function BrandIcon({ path, viewBox, color, size }: { path: string | string[]; viewBox: string; color: string; size: number }) {
  const paths = Array.isArray(path) ? path : [path];
  return <svg viewBox={viewBox} width={size} height={size} fill={color} aria-hidden="true">
    {paths.map((value, index) => <path d={value} key={index} />)}
  </svg>;
}

const IconPickerInput = forwardRef<HTMLButtonElement, IconPickerInputProps>(({
  disabled,
  error,
  hint,
  label,
  labelAction,
  name,
  onChange,
  required,
  value,
}, ref) => {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState<'all' | 'lucide' | 'brands'>('all');
  const [open, setOpen] = useState(!value?.name);
  const current = value || null;
  const CurrentIcon = current?.name ? icons[current.name as keyof typeof icons] as LucideIcon | undefined : undefined;
  const isBrand = current?.library === 'fontawesome-brands' && current.path && current.viewBox;
  const color = current?.color || DEFAULT_COLOR;
  const size = current?.size || DEFAULT_SIZE;
  const strokeWidth = current?.strokeWidth || DEFAULT_STROKE;

  const filteredIcons = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const lucideMatches = words.length
      ? iconEntries.filter(([iconName]) => words.every((word) => readableName(iconName).toLowerCase().includes(word)))
      : iconEntries;
    const brandMatches = words.length
      ? brandEntries.filter((brand) => words.every((word) => readableName(brand.iconName).toLowerCase().includes(word)))
      : brandEntries;
    return {
      lucide: family === 'brands' ? [] : lucideMatches.slice(0, family === 'lucide' ? 120 : 80),
      brands: family === 'lucide' ? [] : brandMatches.slice(0, family === 'brands' ? 120 : 40),
    };
  }, [family, query]);

  const update = (patch: Partial<IconPickerValue>) => {
    const next: IconPickerValue = {
      name: current?.name || 'Circle',
      color,
      size,
      strokeWidth,
      ...patch,
    };
    onChange(name, next);
  };

  return (
    <Field.Root name={name} error={error} hint={hint} required={required}>
      <Field.Label action={labelAction}>{label}</Field.Label>
      <Panel>
        <Preview>
          <PreviewIcon>
            {isBrand
              ? <BrandIcon path={current.path!} viewBox={current.viewBox!} color={color} size={Math.min(size, 52)} />
              : CurrentIcon ? <CurrentIcon color={color} size={Math.min(size, 52)} strokeWidth={strokeWidth} /> : '—'}
          </PreviewIcon>
          <div style={{ flex: 1 }}>
            <strong>{current?.name ? readableName(current.name) : 'Aucune icône sélectionnée'}</strong>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <ActionButton ref={ref} type="button" disabled={disabled} onClick={() => setOpen((state) => !state)}>
                {open ? 'Fermer la bibliothèque' : 'Choisir une icône'}
              </ActionButton>
              {current && (
                <ActionButton type="button" disabled={disabled} onClick={() => onChange(name, null)}>
                  <Trash2 size={15} /> Retirer
                </ActionButton>
              )}
            </div>
          </div>
        </Preview>

        {current && (
          <Controls>
            <Control>
              Couleur
              <ColorRow>
                <input type="color" value={color} disabled={disabled} onChange={(event) => update({ color: event.target.value })} aria-label="Couleur de l’icône" />
                <Input value={color} disabled={disabled} pattern="^#[0-9A-Fa-f]{6}$" onChange={(event) => update({ color: event.target.value })} />
              </ColorRow>
            </Control>
            <Control>
              Taille (px)
              <Input type="number" min="8" max="160" value={size} disabled={disabled} onChange={(event) => update({ size: Math.min(160, Math.max(8, Number(event.target.value) || DEFAULT_SIZE)) })} />
            </Control>
            <Control>
              Épaisseur
              <Input type="number" min="0.5" max="4" step="0.25" value={strokeWidth} disabled={disabled} onChange={(event) => update({ strokeWidth: Math.min(4, Math.max(0.5, Number(event.target.value) || DEFAULT_STROKE)) })} />
            </Control>
          </Controls>
        )}

        {open && (
          <Picker>
            <SearchBox>
              <Search size={18} />
              <Input autoFocus value={query} disabled={disabled} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher : équipe, flèche, bâtiment…" aria-label="Rechercher une icône" />
            </SearchBox>
            <FilterRow>
              <ActionButton type="button" onClick={() => setFamily('all')} aria-pressed={family === 'all'}>Toutes</ActionButton>
              <ActionButton type="button" onClick={() => setFamily('lucide')} aria-pressed={family === 'lucide'}>Interface</ActionButton>
              <ActionButton type="button" onClick={() => setFamily('brands')} aria-pressed={family === 'brands'}>Marques et réseaux sociaux</ActionButton>
            </FilterRow>
            <Grid>
              {filteredIcons.lucide.map(([iconName, Icon]) => (
                <IconButton key={`lucide-${iconName}`} type="button" disabled={disabled} $selected={current?.library !== 'fontawesome-brands' && current?.name === iconName} onClick={() => { update({ name: iconName, library: 'lucide', path: undefined, viewBox: undefined }); setOpen(false); }} title={readableName(iconName)}>
                  <Icon size={24} />
                  <span>{readableName(iconName)}</span>
                </IconButton>
              ))}
              {filteredIcons.brands.map((brand) => {
                const [width, height, , , path] = brand.icon;
                const viewBox = `0 0 ${width} ${height}`;
                return <IconButton key={`brand-${brand.iconName}`} type="button" disabled={disabled} $selected={current?.library === 'fontawesome-brands' && current.name === brand.iconName} onClick={() => { update({ name: brand.iconName, library: 'fontawesome-brands', path, viewBox, color: brandColors[brand.iconName] || color }); setOpen(false); }} title={readableName(brand.iconName)}>
                  <BrandIcon path={path} viewBox={viewBox} color="currentColor" size={24} />
                  <span>{readableName(brand.iconName)}</span>
                </IconButton>;
              })}
            </Grid>
            <small style={{ display: 'block', marginTop: 10 }}>
              {filteredIcons.lucide.length + filteredIcons.brands.length} résultats affichés — affinez la recherche pour parcourir toute la bibliothèque.
            </small>
          </Picker>
        )}
      </Panel>
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
});

IconPickerInput.displayName = 'IconPickerInput';

export default IconPickerInput;
