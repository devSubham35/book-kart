import { bookData } from '@/data'
import BookDetails from '@/modules/book/pages/BookDetailsUI'

const BookDetailsPage = () => {
  return (
    <div>
        <BookDetails book={bookData} />
    </div>
  )
}

export default BookDetailsPage