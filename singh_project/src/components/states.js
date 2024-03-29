const States = () => {

    const states = [
        'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
        'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
        'MI', 'MN', 'MS', 'MO', 'MT', 'NC', 'NE', 'NH', 'NJ', 'NM', 'NV',
        'NY', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
        'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ]

    return (
        states.map(state => {
            return <option>{state}</option>
        })
    )
}

export default States