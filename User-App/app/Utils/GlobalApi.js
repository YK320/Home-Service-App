import { request, gql } from 'graphql-request'

const MASTER_URL="https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clw806k0j01s507vtyfelojc3/master"

const getSlider=async()=>{
    const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }
      
  `
 const result= await request(MASTER_URL, query);
 return result;
}


const getCategories=async()=>{
    const query=gql`
    query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      }
      `

      const result= await request(MASTER_URL, query);
      return result;
}

const getBusinessList=async()=>{
  const query=gql`
  query getBusinessList {
    businessLists {
      id
      name
      email
      price
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
        
      }
    }
  }
  `
  const result= await request(MASTER_URL, query);
  return result;
}

const getBusinessListByCategory=async(category)=>{
  const query=gql`
  query getBusinessList {
    businessLists(where: {category: {name: "`+category+`"}}) {
      id
      name
      email
      price
      contactPerson
      category {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  `
  const result= await request(MASTER_URL, query);
  return result;
}

const createBooking=async(data)=>{
  const mutationQuery=gql`
  mutation createBooking {
    createBooking(
      data: {
        bookingStatus: Booked, 
        businessList: {
          connect: {id: "`+data.businessId+`"}}, 
        date: "`+data.date+`", 
        time: "`+data.time+`", 
        userEmail: "`+data.userEmail+`", 
        userName: "`+data.userName+`"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  }
  `
  const result= await request(MASTER_URL, mutationQuery);
  return result;
}


const getUserBookings=async(userEmail)=>{
  const query=gql`
  query GetUserBookings {
  bookings(orderBy: updatedAt_DESC, 
  where: {userEmail: "`+userEmail+`"}) {
    time
    userEmail
    userName
    bookingStatus
    date
    id
    businessList {
      id
      images {
        url
      }
      name
      price
      address
      contactPerson
      email
      about
    }
  }
}

  `

  const result= await request(MASTER_URL, query);
  return result;
}

const BusinessBookedSlot=async(businessId,date)=>{
  const query=gql`
  query BusinessBookedSlot {
  bookings(where: {businessList: {id: "`+businessId+`"}, date: "`+date+`"}) {
    date
    time
  }
}

  `

  const result= await request(MASTER_URL, query);
  return result;
}

export default{
    getSlider,
    getCategories,
    getBusinessList,
    getBusinessListByCategory,
    createBooking,
    getUserBookings,
    BusinessBookedSlot
}
