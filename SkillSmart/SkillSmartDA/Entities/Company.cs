using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Company : MongoEntity
    {
        /// <summary>
        /// CompanyName
        /// </summary>
        [BsonElement("CompanyName")]
        public string CompanyName { get; set; }


        /// <summary>
        /// StreetAddress
        /// </summary>
        [BsonElement("StreetAddress")]
        public string StreetAddress { get; set; }


        /// <summary>
        /// Address2
        /// </summary>
        [BsonElement("Address2")]
        public string Address2 { get; set; }
        
        /// <summary>
        /// City
        /// </summary>
        [BsonElement("City")]
        public string City { get; set; }

        /// <summary>
        /// State
        /// </summary>
        [BsonElement("State")]
        public string State { get; set; }

        /// <summary>
        /// Zip
        /// </summary>
        [BsonElement("Zip")]
        public string Zip { get; set; }

        /// <summary>
        /// Country
        /// </summary>
        [BsonElement("Country")]
        public string Country { get; set; }

        /// <summary>
        /// Sector
        /// </summary>
        [BsonElement("Sector")]
        public string Sector { get; set; }

        /// <summary>
        /// Industry
        /// </summary>
        [BsonElement("Industry")]
        public string Industry { get; set; }

        /// <summary>
        /// EmployerSize
        /// </summary>
        [BsonElement("EmployerSize")]
        public string EmployerSize { get; set; }

        /// <summary>
        /// Phone
        /// </summary>
        [BsonElement("Phone")]
        public string Phone { get; set; }

        /// <summary>
        /// CompanyURL
        /// </summary>
        [BsonElement("CompanyURL")]
        public string CompanyURL { get; set; }

        /// <summary>
        /// CompanyDescription
        /// </summary>
        [BsonElement("CompanyDescription")]
        public string CompanyDescription { get; set; }

    }
}
