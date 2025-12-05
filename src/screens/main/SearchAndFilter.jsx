import React, { useMemo, useState, useEffect } from 'react'
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Typography,
  Chip,
  Stack,
  Button,
  Divider,
  Menu,
  ListItemText,
  Checkbox
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

/**
 * SearchAndFilter component
 * Props:
 *  - products: array of product objects { id, name, price, rating, category, description }
 *  - onFiltered: (filteredProducts) => void  // called when filtered list changes
 *
 * The component keeps its own UI state and emits the filtered products via onFiltered.
 * If no products prop is provided, a small demo dataset will be used.
 */

const demoProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, rating: 4.5, category: 'Audio', description: 'Noise-cancelling, long battery' },
  { id: 2, name: 'Smart Watch', price: 4999, rating: 4.0, category: 'Wearables', description: 'Fitness tracking & notifications' },
  { id: 3, name: 'Bluetooth Speaker', price: 1999, rating: 4.2, category: 'Audio', description: 'Portable with deep bass' },
  { id: 4, name: 'Action Camera', price: 8999, rating: 4.1, category: 'Cameras', description: '4K, waterproof' },
  { id: 5, name: 'Gaming Mouse', price: 2499, rating: 4.6, category: 'Peripherals', description: 'High DPI, RGB' }
]

export default function SearchAndFilter({ products, onFiltered }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [minPrice, maxPrice] = useMemo(() => {
    // derive reasonable slider bounds from products
    const prices = products.map((p) => p.price)
    const min = Math.min(...prices, 0)
    const max = Math.max(...prices, 10000)
    return [Math.floor(min), Math.ceil(max)]
  }, [products])
  const [rating, setRating] = useState(0) // minimum rating
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)

  // Initialize priceRange to full range on mount / when products change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category))
    return ['All', ...Array.from(set)]
  }, [products])

  // filtering logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = products.filter((p) => {
      // price range
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false
      // rating
      if (rating > 0 && p.rating < rating) return false
      // category(s)
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false
      // single category fallback
      if (category && category !== 'All' && selectedCategories.length === 0 && p.category !== category) return false
      // query match (name or description)
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q))
      )
    })

    // sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // relevance: keep original order or simple heuristic
        list.sort((a, b) => {
          // bring items whose name starts with query higher
          if (q) {
            const aStarts = a.name.toLowerCase().startsWith(q) ? -1 : 0
            const bStarts = b.name.toLowerCase().startsWith(q) ? 1 : 0
            return aStarts + bStarts
          }
          return 0
        })
    }

    return list
  }, [products, query, category, priceRange, rating, sortBy, selectedCategories])

  // emit filtered results when they change
  useEffect(() => {
    if (onFiltered) onFiltered(filtered)
  }, [filtered, onFiltered])

  // handlers
  const handleClear = () => {
    setQuery('')
    setCategory('All')
    setSelectedCategories([])
    setPriceRange([minPrice, maxPrice])
    setRating(0)
    setSortBy('relevance')
  }

  const handleCategoryToggle = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories((s) => s.filter((c) => c !== cat))
    } else {
      setSelectedCategories((s) => [...s, cat])
    }
  }

  const openMenu = (e) => setAnchorEl(e.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  return (
    <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            placeholder="Search products, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {query && (
                    <IconButton size="small" onClick={() => setQuery('')}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort</InputLabel>
            <Select label="Sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="price-asc">Price: Low → High</MenuItem>
              <MenuItem value="price-desc">Price: High → Low</MenuItem>
              <MenuItem value="rating-desc">Rating</MenuItem>
              <MenuItem value="name-asc">Name A → Z</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">Min Rating:</Typography>
            <Select
              size="small"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              sx={{ width: 96 }}
            >
              <MenuItem value={0}>Any</MenuItem>
              <MenuItem value={1}>1+</MenuItem>
              <MenuItem value={2}>2+</MenuItem>
              <MenuItem value={3}>3+</MenuItem>
              <MenuItem value={4}>4+</MenuItem>
            </Select>

            <Button size="small" variant="outlined" onClick={openMenu}>
              Categories
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle2" sx={{ px: 1 }}>
                  Filter by categories
                </Typography>
                <Divider sx={{ my: 1 }} />
                {categories
                  .filter((c) => c !== 'All')
                  .map((c) => (
                    <MenuItem key={c} onClick={() => handleCategoryToggle(c)}>
                      <Checkbox checked={selectedCategories.includes(c)} />
                      <ListItemText primary={c} />
                    </MenuItem>
                  ))}
                <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
                  <Button size="small" onClick={() => { setSelectedCategories([]); closeMenu(); }}>
                    Clear
                  </Button>
                  <Button size="small" onClick={closeMenu} variant="contained">
                    Apply
                  </Button>
                </Box>
              </Box>
            </Menu>

            <Button size="small" onClick={handleClear}>
              Reset
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ px: 1 }}>
            <Typography variant="caption">Price range (₹)</Typography>
            <Slider
              value={priceRange}
              onChange={(e, v) => setPriceRange(v)}
              valueLabelDisplay="auto"
              min={minPrice}
              max={maxPrice}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Typography variant="body2">₹{priceRange[0]}</Typography>
              <Box sx={{ flex: 1 }} />
              <Typography variant="body2">₹{priceRange[1]}</Typography>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: { xs: 1, md: 0 } }}>
            {selectedCategories.length > 0 ? (
              selectedCategories.map((c) => (
                <Chip key={c} label={c} onDelete={() => handleCategoryToggle(c)} />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No category chips selected
              </Typography>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">Results: {filtered.length}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
