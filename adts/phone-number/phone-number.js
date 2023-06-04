export class PhoneNumber {
    area;   // area @code (3 digits)
    exch;   // exchange  (3 digits)
    ext;    // extension (4 digits)

    /**
     * Initializes a new phone number.
     *
     * @param  area the area @code (3 digits)
     * @param  exch the exchange (3 digits)
     * @param  ext  the extension (4 digits)
     */
    constructor(area, exch, ext) {
        this.area = area;
        this.exch = exch;
        this.ext  = ext;
    }

    /**
     * Compares this phone number to the specified phone number.
     *
     * @param  other the other phone number
     * @return {@code true} if this phone number equals {@code other};
     *         {@code false} otherwise
     */
    @Override
    equals(other) {
        if (other == this) return true;
        if (other == null) return false;
        if (other.getClass() != this.getClass()) return false;
        const that = other;
        return (this.area == that.area) && (this.exch == that.exch) && (this.ext == that.ext);
    }

    /**
     * Returns a string representation of this phone number.
     *
     * @return a string representation of this phone number
     */
    @Override
    toString() {
        // 0 for padding with digits with leading 0s
        return StdOut.printf("(%d) %d-%d", area, exch, ext);
    }

    /**
     * Returns an integer hash code for this phone number.
     *
     * @return an integer hash code for this phone number
     */
    @Override
    hashCode() {
        return 31 * (area + 31 * exch) + ext;
    }

    /**
     * Unit tests the {@code PhoneNumber} data type.
     *
     * @param args the command-line arguments
     */
    static main(args) {
        const a = new PhoneNumber(609, 258, 4455);
        const b = new PhoneNumber(609, 876, 5309);
        const c = new PhoneNumber(609, 555, 5309);
        const d = new PhoneNumber(215, 876, 5309);
        const e = new PhoneNumber(609, 876, 5309);
        StdOut.printf("a = " + a);
        StdOut.printf("b = " + b);
        StdOut.printf("c = " + c);
        StdOut.printf("d = " + d);
        StdOut.printf("e = " + e);

        const set = new Set();
        set.add(a);
        set.add(b);
        set.add(c);
        StdOut.printf("Added a, b, and c");
        StdOut.printf("contains a:  " + set.contains(a));
        StdOut.printf("contains b:  " + set.contains(b));
        StdOut.printf("contains c:  " + set.contains(c));
        StdOut.printf("contains d:  " + set.contains(d));
        StdOut.printf("contains e:  " + set.contains(e));
        StdOut.printf("b == e:      " + (b == e));
        StdOut.printf("b.equals(e): " + (b.equals(e)));
    }
}
